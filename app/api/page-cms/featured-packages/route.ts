import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";

export const dynamic = "force-dynamic";

const DEFAULT_SETTINGS = {
  sectionTitle: "Featured Packages",
  sectionSubtitle: "Handpicked premium packages for your next vacation",
  selectedPackages: [],
  isActive: true,
  displayOrder: 1
};

export async function GET() {
  try {
    const db = await getDatabase();
    const cmsDoc = await db.collection("page_cms").findOne({ page: "featured-packages" });
    
    return NextResponse.json({
      success: true,
      data: cmsDoc?.data || DEFAULT_SETTINGS
    });
  } catch (err) {
    console.error("GET ADMIN FEATURED CMS ERROR:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDatabase();
    
    await db.collection("page_cms").updateOne(
      { page: "featured-packages" },
      {
        $set: {
          data: {
            sectionTitle: body.sectionTitle || "",
            sectionSubtitle: body.sectionSubtitle || "",
            selectedPackages: Array.isArray(body.selectedPackages) ? body.selectedPackages : [],
            isActive: typeof body.isActive === "boolean" ? body.isActive : true,
            displayOrder: typeof body.displayOrder === "number" ? body.displayOrder : 1
          },
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true, message: "Featured packages CMS saved successfully" });
  } catch (err) {
    console.error("POST ADMIN FEATURED CMS ERROR:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
