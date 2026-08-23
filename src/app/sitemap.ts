import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/**
 * Two routes, so this stays a literal list rather than a filesystem crawl.
 * Add an entry when you add a route.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/resume`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
