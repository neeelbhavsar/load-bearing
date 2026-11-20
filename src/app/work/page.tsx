import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { engagementLabel, profile, projects, seo } from "@/content/portfolio";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { workIndexGraph } from "@/lib/structured-data";

const description = `Case studies by ${profile.name}, ${seo.jobTitle.toLowerCase()}: ${projects
  .slice(0, 4)
  .map((p) => `${p.title} (${p.category.toLowerCase()})`)
  .join(", ")} and more, with architecture, role and outcomes.`;

export const metadata: Metadata = {
  title: "Case studies",
  description,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Case studies — ${profile.name}`,
    description,
    url: "/work",
    type: "website",
    images: ["/opengraph-image"],
  },
};

/**
 * /work: every case study on one crawlable, server-rendered page.
 *
 * The case studies were reachable only from cards inside the home page's
 * animated gallery, one link each, which left Google little reason to crawl
 * them ("Discovered – currently not indexed"). A hub page gives each one a
 * plain link with descriptive text, sits between home and the case studies in
 * the breadcrumb trail, and is linked from the footer of every page.
 */
export default function WorkIndexPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pt-24 pb-20 sm:px-8 sm:pt-32 sm:pb-28">
      <JsonLd data={workIndexGraph()} />
      <Breadcrumbs items={[{ name: profile.name, href: "/" }, { name: "Case studies" }]} />

      <header className="mt-8 border-b border-border pb-10 sm:mt-10">
        <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] tracking-[-0.035em]">
          Case studies
        </h1>
        <p className="mt-5 max-w-[65ch] leading-relaxed text-fg-muted">
          {projects.length} production systems I&apos;ve built: what each product does, how it is
          put together, the decisions I owned and what came out of it. Client work was delivered
          at Artoon Solutions; AI Library is my own.
        </p>
      </header>

      <ol className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <article
              className="group relative flex h-full flex-col rounded-3xl border border-border bg-bg-elev p-5 transition-colors duration-500 hover:border-border-strong sm:p-7"
              style={{ ["--acc" as string]: project.accent }}
            >
              <p className="font-mono text-[11px] tracking-[0.16em] text-fg-faint uppercase">
                {project.period} · {project.role}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight">
                {/* The whole card is the hit area via the ::after overlay, but
                    the link text itself is the title plus category — that is
                    the anchor text Google reads. */}
                <Link
                  href={`/work/${project.slug}`}
                  className="after:absolute after:inset-0 after:rounded-3xl after:content-['']"
                >
                  {project.title}
                  <span className="sr-only">: {project.category} case study</span>
                </Link>
              </h2>
              <p className="mt-1 text-sm" style={{ color: project.accent }}>
                {project.category}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{project.blurb}</p>
              {project.metric && (
                <p className="mt-4 font-mono text-[11px] tracking-[0.12em] text-fg uppercase">
                  {project.metric}
                </p>
              )}
              <p className="mt-2 font-mono text-[11px] leading-relaxed tracking-wide text-fg-faint">
                {project.stack.join(" · ")}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4 sm:pt-5">
                <span className="font-mono text-[10px] tracking-[0.14em] text-fg-faint uppercase sm:text-[11px]">
                  {engagementLabel[project.engagement]}
                </span>
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="shrink-0 text-fg-muted transition-colors duration-300 group-hover:text-[var(--acc)]"
                />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
