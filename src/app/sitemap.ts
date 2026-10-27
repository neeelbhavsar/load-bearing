import type { MetadataRoute } from "next";
import { projects } from "@/content/portfolio";
import { siteUrl } from "@/lib/site-url";

/**
 * The fixed pages are listed literally; the case studies are derived from the
 * same array that generates their routes, so adding a project to portfolio.ts
 * puts it in the sitemap without a second edit to remember.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  return [
    // No changefreq or priority: Google ignores both. lastmod is the field
    // that counts, and it should only be added with real edit dates.
    { url: base },
    { url: `${base}/resume` },
    ...projects.map((project) => ({ url: `${base}/work/${project.slug}` })),
  ];
}
