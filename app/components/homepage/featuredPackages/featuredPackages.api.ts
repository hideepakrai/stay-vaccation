import { FeaturedData } from "./featuredPackages.types";

/**
 * Fetches the active homepage featured packages from the CMS API.
 */
export async function fetchFeaturedPackages(): Promise<FeaturedData | null> {
  try {
    const res = await fetch("/api/home/featured-packages");
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    console.error("fetchFeaturedPackages failed:", err);
    return null;
  }
}
