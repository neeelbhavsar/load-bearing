import type { MetadataRoute } from "next";
import { contentUpdated, projects } from "@/content/portfolio";
import { siteUrl } from "@/lib/site-url";

/**
 * The fixed pages are listed literally; the case studies are derived from the
 * same array that generates their routes, so adding a project to portfolio.ts
 * puts it in the sitemap without a second edit to remember.
 *
 * lastmod is the one sitemap field Google uses: it schedules crawls by it, and
 * a sitemap without it gave "Discovered – currently not indexed" pages nothing
 * to move them up the queue. It comes from `contentUpdated`, a real edit date,
 * because Google stops trusting lastmod on sites where it is always "now".
 *
 * No changefreq or priority: Google ignores both.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date(`${contentUpdated}T00:00:00Z`);

  return [
    { url: base, lastModified },
    { url: `${base}/work`, lastModified },
    { url: `${base}/resume`, lastModified },
    ...projects.map((project) => ({ url: `${base}/work/${project.slug}`, lastModified })),
  ];
}
