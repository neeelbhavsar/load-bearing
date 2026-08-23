import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { profile, resume, seo } from "@/content/portfolio";
import { JsonLd } from "@/components/json-ld";
import { resumeGraph } from "@/lib/structured-data";

export const metadata: Metadata = {
  // The layout's title.template appends the site name, so this stays short.
  title: "Résumé",
  // resume.summary is a 90-word paragraph — far past what a search result shows.
  // seo.resumeDescription is the trimmed version written for the SERP.
  description: seo.resumeDescription,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `${profile.name} — Résumé`,
    description: seo.resumeDescription,
    url: "/resume",
    type: "profile",
  },
};

/**
 * The résumé as a page, not a download. Same tokens and type as the rest of the
 * site, so following the Résumé button feels like staying inside the portfolio
 * rather than being handed a file.
 *
 * A print stylesheet in globals.css flattens it to ink-on-paper if anyone hits
 * Ctrl+P — no separate PDF to keep in sync.
 */
export default function ResumePage() {
  const { contact } = resume;

  return (
    <div className="mx-auto max-w-[1100px] px-5 pt-24 pb-20 sm:px-8 sm:pt-32 sm:pb-28">
      <JsonLd data={resumeGraph()} />
      <Link
        href="/"
        data-cursor="back"
        className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors duration-300 hover:text-accent print:hidden"
      >
        <ArrowLeft
          size={14}
          aria-hidden
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        />
        Back to portfolio
      </Link>

      {/* ── masthead ── */}
      <header className="mt-8 flex flex-col gap-6 border-b border-border pb-10 sm:mt-10 sm:flex-row sm:items-end sm:gap-10">
        <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-bg-elev sm:size-36">
          <Image
            src={profile.photo}
            alt={`${profile.name} — portrait`}
            fill
            priority
            sizes="144px"
            className="object-cover object-[center_22%]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-display text-[clamp(2.25rem,8vw,4.5rem)] leading-[0.95] tracking-[-0.035em]">
            {profile.name}
          </h1>
          <p className="mt-3 font-mono text-[11px] tracking-[0.22em] text-accent uppercase sm:text-xs">
            {resume.title}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-wide text-fg-muted">
            <li className="inline-flex items-center gap-2">
              <MapPin size={13} aria-hidden className="text-fg-faint" />
              {contact.location}
            </li>
            {contact.phone && (
              <li className="inline-flex items-center gap-2">
                <Phone size={13} aria-hidden className="text-fg-faint" />
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                  {contact.phone}
                </a>
              </li>
            )}
            <li className="inline-flex items-center gap-2">
              <Mail size={13} aria-hidden className="text-fg-faint" />
              <a href={`mailto:${contact.email}`} className="hover:text-accent">
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={`https://${contact.linkedin}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 hover:text-accent"
              >
                {contact.linkedin}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </li>
            <li>
              <a
                href={`https://${contact.github}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 hover:text-accent"
              >
                {contact.github}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </header>

      {/* ── summary ── */}
      <Section label="Summary">
        <p className="max-w-[80ch] leading-relaxed text-fg-muted">{resume.summary}</p>
      </Section>

      {/* Two columns from lg: the narrative on the left, the reference lists on
          the right. Below lg it's one column in reading order. */}
      <div className="mt-14 grid gap-14 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
        <div>
          <Section label="Experience" first>
            {resume.experience.map((job) => (
              <article key={job.company} className="mb-10 last:mb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{job.role}</h3>
                  <p className="font-mono text-[11px] tracking-[0.16em] text-fg-faint uppercase">
                    {job.period}
                  </p>
                </div>
                <p className="mt-1.5 font-mono text-xs tracking-wide text-accent">{job.company}</p>
                <Bullets items={job.bullets} />
              </article>
            ))}
          </Section>

          <Section label="Selected projects">
            {resume.projects.map((project) => (
              <article key={project.name} className="mb-8 last:mb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                    {project.name}
                    <span className="text-fg-muted italic"> — {project.kind}</span>
                  </h3>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-fg-faint uppercase">
                    {project.period}
                  </p>
                </div>
                <Bullets items={project.bullets} />
              </article>
            ))}
          </Section>
        </div>

        <div>
          <Section label="Skills" first>
            <dl className="space-y-6">
              {resume.skills.map((group) => (
                <div key={group.group}>
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase">
                    {group.group}
                  </dt>
                  <dd className="mt-2.5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-bg-elev px-2.5 py-1 font-mono text-[10px] tracking-wide text-fg-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section label="Education">
            {resume.education.map((entry) => (
              <div key={entry.degree}>
                <h3 className="font-display text-xl leading-snug tracking-tight">{entry.degree}</h3>
                <p className="mt-1.5 text-sm text-fg-muted">{entry.school}</p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-fg-faint uppercase">
                  {entry.year}
                </p>
              </div>
            ))}
          </Section>

          <Section label="Languages">
            <dl className="space-y-3">
              {resume.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-fg">{lang.name}</dt>
                  <dd className="font-mono text-[10px] tracking-[0.16em] text-fg-faint uppercase">
                    {lang.level}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        </div>
      </div>

      {/* ── foot ── */}
      <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <p className="font-mono text-[10px] tracking-[0.18em] text-fg-faint uppercase">
          Updated {resume.experience[0].period.split("—")[0].trim()} onward · Ahmedabad, India
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${contact.email}`}
            data-cursor="email"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] text-on-accent uppercase transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get in touch
            <ArrowUpRight size={14} aria-hidden />
          </a>
          <Link
            href="/#work"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            See the work
          </Link>
        </div>
      </div>
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
    <section className={first ? "" : "mt-14"}>
      <h2 className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-fg-faint uppercase">
        {label}
        <span aria-hidden className="h-px flex-1 bg-border" />
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
          <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-accent" />
          <span className="max-w-[80ch]">{item}</span>
        </li>
      ))}
    </ul>
  );
}
