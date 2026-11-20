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
    `Availability: open to ${profile.jobSearch.roles}. Notice period: ${profile.jobSearch.noticePeriod}. Location: ${profile.jobSearch.workPreference}.`,
    "",
    "## Pages",
    "",
    `- [Home](${base}/): profile, experience, selected work, what I do, contact`,
    `- [Case studies](${base}/work): every project, with architecture, role and outcomes`,
    `- [Résumé](${base}/resume): experience, projects, skills, education`,
    `- [Résumé PDF](${base}${profile.resumePdfUrl}): ATS-friendly download of the same résumé`,
    "",
    "## Case studies",
    "",
    ...projects.map(
      (p) => `- [${p.title}: ${p.category}](${base}/work/${p.slug}): ${p.seoDescription ?? p.blurb}`,
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
