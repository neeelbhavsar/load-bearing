"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { testimonials, hasVisibleTestimonials, type Testimonial } from "@/content/portfolio";
import { Reveal, RevealText, SectionLabel } from "@/components/motion-primitives";

/**
 * Feedback wall. A featured pull-quote leads, then the rest sit in a bento grid
 * — varied spans on desktop so it reads as a wall of voices rather than a table
 * of rows, collapsing to a single column on phones.
 *
 * Draft entries (the placeholders in portfolio.ts) render in development only,
 * so the design is reviewable while unverified quotes can never reach
 * production. With nothing publishable the section removes itself entirely.
 */
export function Testimonials() {
  if (!hasVisibleTestimonials()) return null;
  const isDev = process.env.NODE_ENV !== "production";
  const items = testimonials.items.filter((t) => isDev || !t.draft);
  if (items.length === 0) return null;

  // Every featured entry gets a full-width block; short quotes fill the wall
  // below. If nothing is flagged, the first entry leads.
  const featured = items.some((t) => t.featured)
    ? items.filter((t) => t.featured)
    : items.slice(0, 1);
  const rest = items.filter((t) => !featured.includes(t));
  const hasDrafts = items.some((t) => t.draft);

  return (
    <section id="feedback" className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-36">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div>
            <SectionLabel index="07">{testimonials.heading}</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(2rem,7vw,4.5rem)] leading-[1.02] tracking-[-0.035em] sm:mt-5">
              <RevealText text="What they" stagger={0.05} />{" "}
              <span className="text-accent italic">
                <RevealText text="said" delay={0.14} stagger={0.05} />
              </span>
            </h2>
          </div>
          <Reveal className="max-w-sm">
            <p className="text-sm leading-relaxed text-fg-muted">{testimonials.intro}</p>
          </Reveal>
        </div>

        {hasDrafts && (
          <p className="mt-8 rounded-2xl border border-dashed border-border-strong bg-surface/40 px-5 py-4 font-mono text-[11px] leading-relaxed tracking-wide text-fg-muted">
            <span className="text-accent">Dev-only notice —</span> entries marked{" "}
            <code className="text-fg">draft</code> hold placeholder text and are stripped from
            production builds. Replace the quote, name, role and company in{" "}
            <code className="text-fg">src/content/portfolio.ts</code>, then set{" "}
            <code className="text-fg">draft: false</code> to publish.
          </p>
        )}

        {/* ── featured pull-quotes ── */}
        <div className="mt-10 space-y-4 sm:mt-14 sm:space-y-6">
          {featured.map((item) => (
            <FeaturedQuote key={item.name} item={item} />
          ))}
        </div>

        {/* ── the wall ── */}
        {rest.length > 0 && (
          <div className="mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-3">
            {rest.map((item, i) => (
              <Reveal
                key={`${item.name}-${i}`}
                delay={(i % 3) * 0.08}
                /* Every third card runs wide, which is what keeps the grid from
                   settling into even rows on desktop. */
                className={i % 3 === 0 ? "lg:col-span-2" : undefined}
              >
                <QuoteCard item={item} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedQuote({ item }: { item: Testimonial }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = item.quote.split(" ");

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-border bg-bg-elev p-6 sm:p-12"
    >
      {/* accent wash anchored to the quote mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(80% 60% at 0% 0%, ${item.accent}14, transparent 65%)`,
        }}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: item.accent }}
      />

      {/* One figure, one blockquote: the pull-quote and the paragraphs under it
          are the same quotation, so they belong to the same element — that's
          what a screen reader announces as a quote. */}
      <figure className="relative">
        <Quote
          size={28}
          aria-hidden
          className="rotate-180"
          style={{ color: item.accent }}
          strokeWidth={1.5}
        />

        <blockquote className="mt-5 sm:mt-7">
          {/* Words light up as the block passes through the viewport — the same
              scroll-scrubbed reading pace the About section uses. */}
          <p className="max-w-[46ch] font-display text-[1.5rem] leading-[1.35] tracking-[-0.02em] sm:text-[clamp(1.75rem,3.2vw,2.75rem)] sm:leading-[1.25]">
            {words.map((word, i) => (
              <Word
                key={`${word}-${i}`}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              >
                {word}
              </Word>
            ))}
          </p>

          {/* The rest of the feedback. Not scrubbed — by the time you reach it
              you're reading, not scanning. */}
          {item.body && item.body.length > 0 && (
            <div
              className="mt-6 max-w-[70ch] space-y-4 border-l-2 pl-4 sm:mt-8 sm:pl-6"
              style={{ borderColor: `${item.accent}40` }}
            >
              {item.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-sm leading-relaxed text-fg-muted sm:text-[15px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </blockquote>

        <figcaption className="mt-7 sm:mt-9">
          <Attribution item={item} size="lg" />
        </figcaption>
      </figure>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative mr-[0.26em] inline-block">
      <span aria-hidden className="absolute inset-0 opacity-15">
        {children}
      </span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

function QuoteCard({ item }: { item: Testimonial }) {
  return (
    <figure
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg-elev p-5 transition-colors duration-500 hover:border-border-strong sm:p-7"
      style={{ ["--acc" as string]: item.accent }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(110% 70% at 100% 0%, ${item.accent}16, transparent 70%)`,
        }}
      />

      <div className="relative flex flex-1 flex-col">
        <Quote
          size={18}
          aria-hidden
          className="rotate-180 text-fg-faint transition-colors duration-500 group-hover:text-[var(--acc)]"
          strokeWidth={1.5}
        />
        <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-fg-muted transition-colors duration-500 group-hover:text-fg sm:text-base">
          {item.quote}
        </blockquote>
        <figcaption className="mt-6 border-t border-border pt-5">
          <Attribution item={item} size="sm" />
        </figcaption>
      </div>

      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
        style={{ background: item.accent }}
      />
    </figure>
  );
}

/**
 * Name, role and relation. A monogram stands in for a photo — a real avatar
 * needs a real file and permission to use it; initials never misrepresent
 * anyone.
 */
function Attribution({ item, size }: { item: Testimonial; size: "sm" | "lg" }) {
  const initials = item.name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const big = size === "lg";

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <span
        aria-hidden
        className={
          "grid shrink-0 place-items-center rounded-full border font-mono tracking-wider " +
          (big ? "size-12 text-sm" : "size-10 text-[11px]")
        }
        style={{ borderColor: item.accent, color: item.accent }}
      >
        {initials}
      </span>
      <div className="min-w-0">
        <p
          className={
            "font-display tracking-tight " + (big ? "text-xl sm:text-2xl" : "text-base sm:text-lg")
          }
        >
          {item.name}
        </p>
        {/* role can be empty when the title isn't known — don't render a
            dangling separator for it */}
        <p className="mt-0.5 font-mono text-[10px] leading-relaxed tracking-[0.16em] text-fg-faint uppercase">
          {[item.role, item.company].filter(Boolean).join(" · ")}
        </p>
      </div>
      <span
        className="ml-auto shrink-0 rounded-full border border-border px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-fg-faint uppercase"
        style={item.draft ? { borderColor: "var(--color-border-strong)" } : undefined}
      >
        {item.draft ? "Draft" : item.relation}
      </span>

      {item.projects && item.projects.length > 0 && (
        <ul className="flex w-full flex-wrap items-center gap-2 border-t border-border pt-4">
          <li className="font-mono text-[9px] tracking-[0.2em] text-fg-faint uppercase">on</li>
          {item.projects.map((p) => (
            <li
              key={p}
              className="rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide"
              style={{ borderColor: `${item.accent}55`, color: item.accent }}
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
