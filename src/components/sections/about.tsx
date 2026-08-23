"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { about } from "@/content/portfolio";
import { Reveal, SectionLabel } from "@/components/motion-primitives";

/**
 * Scroll-scrubbed paragraph: every word starts dim and lights up as the block
 * passes through the viewport, so reading pace is tied to scroll pace.
 */
function ScrubParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className="text-[1.0625rem] leading-[1.6] text-fg sm:text-2xl sm:leading-[1.5]">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
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
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <span aria-hidden className="absolute inset-0 opacity-15">
        {children}
      </span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-36">
      <SectionLabel index="01">{about.heading}</SectionLabel>

      <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-24">
        <div className="flex flex-col gap-6 sm:gap-8">
          {about.paragraphs.map((p, i) => (
            <ScrubParagraph key={i} text={p} />
          ))}
        </div>

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
