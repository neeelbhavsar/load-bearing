import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, profile } from "@/content/portfolio";
import { JsonLd } from "@/components/json-ld";
import { projectGraph } from "@/lib/structured-data";

/**
 * A case study per project.
 *
 * The detail content already existed — it was only reachable inside a modal on
 * the home page, which meant seven projects' worth of writing collapsed into a
 * single indexable URL. These routes give each one a real address: its own
 * title, description, share image and CreativeWork schema, all from the same
 * `detail` block the modal renders. The modal stays as the quick look and links
 * through to here.
 *
 * Every param is known at build time, so `dynamicParams = false` prerenders all
 * seven and returns a genuine 404 for anything else rather than attempting a
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

  const description = searchDescription(project.blurb);

  return {
    // Just the name. The root template appends "— Neel Bhavsar", and the kicker
    // is a full sentence — pulling it in here produced titles near 80 characters
    // that a search result would cut off mid-phrase.
    title: project.title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description,
      url: `/work/${project.slug}`,
      type: "article",
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

  return (
    <div className="mx-auto max-w-[1100px] px-5 pt-24 pb-20 sm:px-8 sm:pt-32 sm:pb-28">
      <JsonLd data={projectGraph(project)} />

      <Link
        href="/#work"
        data-cursor="back"
        className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors duration-300 hover:text-accent"
      >
        <ArrowLeft
          size={14}
          aria-hidden
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
        All work
      </Link>

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

        <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-5 font-mono text-[11px] tracking-wide">
          <div className="flex gap-2">
            <dt className="text-fg-faint">Role</dt>
            <dd className="text-fg-muted">{project.role}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-fg-faint">Year</dt>
            <dd className="text-fg-muted">{project.year}</dd>
          </div>
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
          priority
          sizes="(min-width: 1100px) 1100px, 100vw"
          className="object-cover"
        />
      </div>

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
                <div key={outcome.label} className="bg-bg-elev p-5">
                  <dd
                    className="font-display text-2xl tracking-tight sm:text-3xl"
                    style={{ color: project.accent }}
                  >
                    {outcome.value}
                  </dd>
                  <dt className="mt-2 font-mono text-[10px] leading-tight tracking-[0.16em] text-fg-faint uppercase">
                    {outcome.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Section>

          <Section label="Stack">
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-bg-elev px-2.5 py-1 font-mono text-[10px] tracking-wide text-fg-muted"
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
          </Section>
        </div>
      </div>

      {/* ── foot ── */}
      <nav
        aria-label="More work"
        className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <Link
          href={`/work/${next.slug}`}
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
          href="/#contact"
          data-cursor="talk"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] text-on-accent uppercase transition-transform duration-300 hover:-translate-y-0.5"
        >
          Start a project
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
