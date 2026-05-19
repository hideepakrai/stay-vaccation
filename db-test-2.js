const { getBestSellingPackages } = require('./app/utils/getPackages');
const fs = require('fs');

function loadEnv() {
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    const lines = envContent.split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    }
  } catch (e) {
    console.error('Could not load .env file', e);
  }
}

async function run() {
  loadEnv();
  const res = await getBestSellingPackages(8);
  console.log(`getBestSellingPackages(8) returned ${res.length} packages.`);
  console.log(JSON.stringify(res, null, 2));
}

run();
