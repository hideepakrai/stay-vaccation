import { NextResponse } from "next/server";
import { getBestSellingPackages } from "@/app/utils/getPackages";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const all = await getBestSellingPackages(8);
    const india = await getBestSellingPackages(8, "India");
    const intl = await getBestSellingPackages(8, "International");
    return NextResponse.json({
      success: true,
      all,
      india,
      intl
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message
    });
  }
}
