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
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/resume`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
