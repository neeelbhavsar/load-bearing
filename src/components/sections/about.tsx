"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { about } from "@/content/portfolio";
import { Reveal, SectionLabel } from "@/components/motion-primitives";

/**
 * Scroll-scrubbed copy. Words start dim and light up as you scroll, so reading
 * pace is tied to scroll pace.
 *
 * One progress value drives every word in the section, and word ranges are
 * computed across the whole block rather than per paragraph. That distinction
 * is the whole effect: a `useScroll` per paragraph gives each its own 0→1 sweep,
 * and since all of them sit in the viewport together those sweeps run at once —
 * the highlight restarts at every paragraph instead of travelling through the
 * section. Measured once, over all the text, it reads as a single pass.
 */
function ScrubbedCopy({ paragraphs }: { paragraphs: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Starts as the block enters the lower third and finishes a little before
    // it leaves the top, so the last word lights while still comfortably read.
    offset: ["start 0.85", "end 0.5"],
  });

  // Global word index per paragraph, so ranges continue across the paragraph
  // break instead of resetting to 0.
  const words = paragraphs.map((p) => p.split(" "));
  const total = words.reduce((n, w) => n + w.length, 0);
  // Pure: no accumulator mutated during render. Three paragraphs, so the
  // repeated slice costs nothing.
  const offsets = words.map((_, i) =>
    words.slice(0, i).reduce((n, w) => n + w.length, 0),
  );

  // Each word lights over a window SPAN words wide, so neighbours overlap into
  // a soft wave. The divisor is (total - 1 + SPAN), not `total`: it makes the
  // last word's window end exactly at progress 1. Dividing by `total` pushes it
  // past 1, where useTransform clamps — leaving the final words permanently dim.
  const SPAN = 3;
  const scale = total - 1 + SPAN;

  return (
    <div ref={ref} className="flex flex-col gap-6 sm:gap-8">
      {paragraphs.map((_, pi) => (
        <p
          key={pi}
          className="text-[1.0625rem] leading-[1.6] text-fg sm:text-2xl sm:leading-[1.5]"
        >
          {words[pi].map((word, wi) => {
            const index = offsets[pi] + wi;
            return (
              <Word
                key={`${word}-${index}`}
                progress={scrollYProgress}
                range={[index / scale, (index + SPAN) / scale]}
                reduced={reduced}
              >
                {word}
              </Word>
            );
          })}
        </p>
      ))}
    </div>
  );
}

function Word({
  children,
  progress,
  range,
  reduced,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduced: boolean | null;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      {/* Faint backdrop so a word is never invisible, only unlit. aria-hidden
          because the animated copy below is the one that gets read. */}
      <span aria-hidden className="absolute inset-0 opacity-15">
        {children}
      </span>
      {/* Reduced motion: fully lit, no scroll coupling. */}
      <motion.span style={reduced ? undefined : { opacity }}>{children}</motion.span>
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-36">
      <SectionLabel index="01">{about.heading}</SectionLabel>

      <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-24">
        <ScrubbedCopy paragraphs={about.paragraphs} />

        <Reveal delay={0.1} className="lg:pt-4">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {about.stats.map((s) => (
              <div
                key={s.label}
                className="group relative bg-bg-elev p-5 transition-colors duration-500 hover:bg-surface sm:p-8"
              >
                <dt className="font-mono text-[9px] leading-tight tracking-[0.16em] text-fg-faint uppercase sm:text-[10px] sm:tracking-[0.2em]">
                  {s.label}
                </dt>
                <dd className="mt-2.5 font-display text-3xl tracking-tight text-fg transition-colors duration-500 group-hover:text-accent sm:mt-3 sm:text-5xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
