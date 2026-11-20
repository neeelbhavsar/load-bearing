import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { contentUpdated, engagementLabel, projects, profile } from "@/content/portfolio";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { projectGraph } from "@/lib/structured-data";

/**
 * A case study per project.
 *
 * The detail content already existed — it was only reachable inside a modal on
 * the home page, which meant every project's writing collapsed into a
 * single indexable URL. These routes give each one a real address: its own
 * title, description, share image and CreativeWork schema, all from the same
 * `detail` block the modal renders. The modal stays as the quick look and links
 * through to here.
 *
 * Every param is known at build time, so `dynamicParams = false` prerenders
 * every case study and returns a genuine 404 for anything else rather than attempting a
 * render for a slug that cannot exist.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function bySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/**
 * Card blurbs are written for the card, where two or three sentences read fine.
 * A search result cuts off around 160 characters, so a blurb pasted straight in
 * gets clipped mid-word.
 *
 * Prefer whole sentences that fit; fall back to a word boundary with an ellipsis
 * rather than slicing a word in half. Nothing is reworded — this only ever
 * shortens, so a description can never claim something the blurb didn't.
 */
const MAX = 158;

function searchDescription(blurb: string) {
  if (blurb.length <= MAX) return blurb;

  // Keep as many complete sentences as fit.
  const sentences = blurb.match(/[^.!?]+[.!?]+\s*/g) ?? [];
  let kept = "";
  for (const sentence of sentences) {
    if ((kept + sentence).trim().length > MAX) break;
    kept += sentence;
  }
  if (kept.trim().length > 60) return kept.trim();

  // One very long sentence: cut at the last space that fits.
  const cut = blurb.slice(0, MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]$/, "")}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) return {};

  const description = project.seoDescription ?? searchDescription(project.blurb);

  return {
    // Name plus "case study". The root template appends "— Neel Bhavsar". The
    // kicker is a full sentence, and pulling it in produced titles near 80
    // characters that a search result would cut off mid-phrase. A bare name
    // ("Jolt — Neel Bhavsar") said nothing about what the page is, and
    // "Jolt case study" not much more: the category says what the product is,
    // which is what someone searching for that kind of work types.
    title: `${project.title} case study: ${project.category}`,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title}: ${project.category} — ${profile.name}`,
      description,
      url: `/work/${project.slug}`,
      type: "article",
      modifiedTime: contentUpdated,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = bySlug(slug);
  if (!project) notFound();

  // Ordered by the same array the home page uses, so "next case study" walks
  // the work in the order it is presented there.
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <div className="mx-auto max-w-[1100px] px-5 pt-24 pb-20 sm:px-8 sm:pt-32 sm:pb-28">
      <JsonLd data={projectGraph(project)} />

      {/* Same trail as the BreadcrumbList in the JSON-LD. */}
      <Breadcrumbs
        items={[
          { name: profile.name, href: "/" },
          { name: "Case studies", href: "/work" },
          { name: project.title },
        ]}
      />

      {/* ── masthead ── */}
      <header className="mt-8 sm:mt-10">
        <p
          className="font-mono text-[11px] tracking-[0.22em] uppercase"
          style={{ color: project.accent }}
        >
          {project.detail.kicker}
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] tracking-[-0.035em]">
          {project.title}
        </h1>
        <p className="mt-3 text-lg text-fg-muted sm:text-xl">{project.category} case study</p>

        <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-5 font-mono text-[11px] tracking-wide">
          <div className="flex gap-2">
            <dt className="text-fg-faint">Role</dt>
            <dd className="text-fg-muted">{project.role}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-fg-faint">Period</dt>
            <dd className="text-fg-muted">{project.period}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-fg-faint">Delivered as</dt>
            <dd className="text-fg-muted">{engagementLabel[project.engagement]}</dd>
          </div>
          {project.ownership?.team && (
            <div className="flex gap-2">
              <dt className="text-fg-faint">Team</dt>
              <dd className="text-fg-muted">{project.ownership.team}</dd>
            </div>
          )}
          {project.metric && (
            <div className="flex gap-2">
              <dt className="text-fg-faint">Impact</dt>
              <dd style={{ color: project.accent }}>{project.metric}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-bg-elev">
        <Image
          src={project.image}
          alt={`${project.title} — cover`}
          fill
          preload
          fetchPriority="high"
          sizes="(min-width: 1100px) 1100px, 100vw"
          className="object-cover"
        />
      </div>

      {/* Full width, above the two columns: four boxes in a row need the
          room, and the diagram is the quickest read on the page. */}
      {project.architecture && (
        <div className="mt-14">
          <Section label="Architecture" first>
            <ArchitectureDiagram
              architecture={project.architecture}
              accent={project.accent}
              title={project.title}
            />
          </Section>
        </div>
      )}

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <Section label="Overview" first>
            <div className="space-y-4">
              {project.detail.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="max-w-[75ch] leading-relaxed text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Section>

          {project.ownership && (
            <Section label="My role">
              {project.ownership.scope && (
                <p className="max-w-[75ch] leading-relaxed text-fg">
                  {project.role} · {project.ownership.scope}
                </p>
              )}
              <h3 className="mt-5 font-mono text-[11px] tracking-[0.2em] text-fg-faint uppercase">
                Decisions I owned
              </h3>
              <ul className="mt-3 space-y-3">
                {project.ownership.decisions.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                    <span
                      aria-hidden
                      className="mt-[0.6em] size-1.5 shrink-0 rounded-full"
                      style={{ background: project.accent }}
                    />
                    <span className="max-w-[75ch]">{item}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section label="What I built">
            <ul className="space-y-3">
              {project.detail.contributions.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                  <span
                    aria-hidden
                    className="mt-[0.6em] size-1.5 shrink-0 rotate-45"
                    style={{ background: project.accent }}
                  />
                  <span className="max-w-[75ch]">{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="The hard parts">
            <div className="space-y-8">
              {project.detail.challenges.map((challenge) => (
                <article key={challenge.title}>
                  <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                    {challenge.title}
                  </h3>
                  <p className="mt-2.5 max-w-[75ch] leading-relaxed text-fg-muted">
                    {challenge.body}
                  </p>
                </article>
              ))}
            </div>
          </Section>
        </div>

        <div>
          <Section label="Outcomes" first>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {project.detail.outcomes.map((outcome) => (
                // dt must come before its dd; flex-col-reverse keeps the value
                // visually on top.
                <div key={outcome.label} className="flex flex-col-reverse bg-bg-elev p-5">
                  <dt className="mt-2 font-mono text-[11px] leading-tight tracking-[0.16em] text-fg-faint uppercase">
                    {outcome.label}
                  </dt>
                  <dd
                    className="font-display text-2xl tracking-tight sm:text-3xl"
                    style={{ color: project.accent }}
                  >
                    {outcome.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section label="Stack">
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-bg-elev px-2.5 py-1 font-mono text-[11px] tracking-wide text-fg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {project.ai && (
            <Section label="AI in the build">
              <p className="text-[15px] leading-relaxed text-fg-muted">{project.ai}</p>
            </Section>
          )}

          <Section label="Live">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="visit"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300 hover:text-accent"
                style={{ color: project.accent }}
              >
                Visit the site
                <ArrowUpRight size={14} aria-hidden />
              </a>
            ) : (
              <p className="text-[15px] leading-relaxed text-fg-muted">
                {project.linkNote ?? "No public URL."}
              </p>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase transition-colors duration-300 hover:text-accent"
              >
                Source on GitHub
                <ArrowUpRight size={14} aria-hidden />
              </a>
            )}
          </Section>
        </div>
      </div>

      {/* ── more case studies ──
          Every case study links to every other one, with the category as
          part of the link text. Before, each page linked only to the next one,
          so most case studies had a single internal link pointing at them —
          too weak a signal for Google to bother crawling. */}
      <section aria-labelledby="more-work" className="mt-16 border-t border-border pt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2
            id="more-work"
            className="font-mono text-[11px] tracking-[0.28em] text-fg-faint uppercase"
          >
            More case studies
          </h2>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors duration-300 hover:text-accent"
          >
            All case studies
            <ArrowUpRight size={13} aria-hidden />
          </Link>
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/work/${p.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-bg-elev px-4 py-3.5 transition-colors duration-300 hover:border-border-strong"
              >
                <span className="font-display text-xl tracking-tight group-hover:text-accent">
                  {p.title}
                </span>
                <span className="mt-0.5 text-sm text-fg-muted">{p.category}</span>
                <span className="mt-2 font-mono text-[10px] tracking-[0.14em] text-fg-faint uppercase">
                  {p.period}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── foot ── */}
      <nav
        aria-label="Case study navigation"
        className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
      >
        <Link
          href={`/work/${previous.slug}`}
          rel="prev"
          className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors duration-300 hover:text-accent"
        >
          <ArrowLeft
            size={14}
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Previous
          <span className="font-display text-xl tracking-tight normal-case">{previous.title}</span>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          rel="next"
          data-cursor="next"
          className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors duration-300 hover:text-accent"
        >
          Next
          <span className="font-display text-xl tracking-tight normal-case">{next.title}</span>
          <ArrowRight
            size={14}
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>

        {/* Not a mailto. A mailto needs a registered mail handler, and where
            there isn't one the click does nothing at all — no error, no tab, no
            way to tell it failed. The contact section works for everyone: it has
            the form, the address, and a copy-to-clipboard button.

            `/#contact` rather than `#contact` because this page isn't the home
            page, so the bare anchor has no target here. Same convention the
            résumé page uses for `/#work`. */}
        <Link
          href="/resume"
          className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors duration-300 hover:text-accent sm:ml-auto sm:mr-6"
        >
          Résumé
        </Link>

        <Link
          href="/#contact"
          data-cursor="talk"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] text-on-accent uppercase transition-transform duration-300 hover:-translate-y-0.5"
        >
          Hire me
          <ArrowUpRight size={14} aria-hidden />
        </Link>
      </nav>
    </div>
  );
}

function Section({
  label,
  children,
  first,
}: {
  label: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section className={first ? "" : "mt-12"}>
      <h2 className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-fg-faint uppercase">
        {label}
        <span aria-hidden className="h-px flex-1 bg-border" />
      </h2>
      {children}
    </section>
  );
}
