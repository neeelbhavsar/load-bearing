import { profile, projects, seo } from "@/content/portfolio";
import { siteUrl } from "@/lib/site-url";

/**
 * /llms.txt — a plain-text map of the site for LLM tools (llmstxt.org format).
 * Google ignores it; answer engines and agents that look for it get a clean
 * summary instead of scraping the animated page. Built from the same data as
 * the pages, so it can't drift from what they say.
 */
export const dynamic = "force-static";

export function GET() {
  const base = siteUrl();

  const body = [
    `# ${profile.name}`,
    "",
    `> ${seo.description}`,
    "",
    "## Pages",
    "",
    `- [Home](${base}/): profile, experience, selected work, services, contact`,
    `- [Résumé](${base}/resume): experience, projects, skills, education`,
    "",
    "## Case studies",
    "",
    ...projects.map(
      (p) => `- [${p.title}](${base}/work/${p.slug}): ${p.seoDescription ?? p.blurb}`,
    ),
    "",
    "## Contact",
    "",
    `- Email: ${profile.email}`,
    ...profile.socials
      .filter((s) => !s.href.startsWith("mailto:"))
      .map((s) => `- ${s.label}: ${s.href}`),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
