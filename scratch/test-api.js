const http = require('http');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

function makeRequest(url, method, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log("=== Starting CMS API Verification Tests ===");

  try {
    // 1. Seed the default users
    console.log("\n1. Seeding default admin user...");
    const seedRes = await makeRequest(`${BASE_URL}/api/auth/seed`, 'POST');
    console.log("Seed Response status:", seedRes.statusCode);
    console.log("Seed Response body:", seedRes.body);

    // 2. Fetch default featured packages (public endpoint)
    console.log("\n2. Fetching public featured packages (defaults)...");
    const getHomeRes = await makeRequest(`${BASE_URL}/api/home/featured-packages`, 'GET');
    console.log("Get Home Status:", getHomeRes.statusCode);
    console.log("Get Home Title:", getHomeRes.body?.data?.sectionTitle);
    console.log("Get Home Packages count:", getHomeRes.body?.data?.packages?.length);

    // 3. Login as admin
    console.log("\n3. Authenticating as admin...");
    const loginRes = await makeRequest(`${BASE_URL}/api/auth/login`, 'POST', {}, {
      email: "admin@stayvacation.com",
      password: "Admin@123"
    });
    console.log("Login Response status:", loginRes.statusCode);
    
    const token = loginRes.body?.token;
    if (!token) {
      console.error("Login failed. Cannot proceed with admin tests.");
      return;
    }
    console.log("Admin logged in successfully. Token acquired.");

    // 4. Fetch all packages to select one
    console.log("\n4. Fetching all available packages...");
    const getPkgsRes = await makeRequest(`${BASE_URL}/api/packages`, 'GET');
    const availablePackages = getPkgsRes.body?.data || [];
    console.log(`Found ${availablePackages.length} packages in DB.`);

    const selectedPkgIds = availablePackages.slice(0, 2).map(p => p.id);
    console.log("Selected package IDs to feature:", selectedPkgIds);

    // 5. Save featured settings as admin
    console.log("\n5. Saving featured packages settings as admin...");
    const postSettingsRes = await makeRequest(
      `${BASE_URL}/api/page-cms/featured-packages`,
      'POST',
      { 'Authorization': `Bearer ${token}` },
      {
        sectionTitle: "Premium Featured Escapes",
        sectionSubtitle: "Special collections hand-selected by StayVacation designers",
        selectedPackages: selectedPkgIds,
        isActive: true,
        displayOrder: 2
      }
    );
    console.log("Save Response status:", postSettingsRes.statusCode);
    console.log("Save Response body:", postSettingsRes.body);

    // 6. Fetch settings back as admin to check saving
    console.log("\n6. Fetching raw settings back...");
    const getSettingsRes = await makeRequest(
      `${BASE_URL}/api/page-cms/featured-packages`,
      'GET',
      { 'Authorization': `Bearer ${token}` }
    );
    console.log("Get settings raw details:", getSettingsRes.body?.data);

    // 7. Fetch resolved featured packages (public endpoint)
    console.log("\n7. Fetching public populated featured packages...");
    const getPopulatedRes = await makeRequest(`${BASE_URL}/api/home/featured-packages`, 'GET');
    console.log("Get Populated Status:", getPopulatedRes.statusCode);
    console.log("Get Populated Title:", getPopulatedRes.body?.data?.sectionTitle);
    console.log("Get Populated Subtitle:", getPopulatedRes.body?.data?.sectionSubtitle);
    console.log("Populated Packages list:", getPopulatedRes.body?.data?.packages?.map(p => ({
      id: p.id,
      packageId: p.packageId,
      title: p.title
    })));

    console.log("\n=== Verification Tests Completed Successfully! ===");
  } catch (err) {
    console.error("\nVerification Failed with error:", err.message);
    console.log("Please make sure Next.js is running locally on port 3000.");
  }
}

runTests();
