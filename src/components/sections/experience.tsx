"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/content/portfolio";
import { Reveal, RevealText, SectionLabel } from "@/components/motion-primitives";

/**
 * One company, told as a timeline. The left column pins while the right column
 * scrolls; a scroll-linked rail fills to show how far through the arc you are.
 */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.65", "end 0.85"],
  });
  const railScale = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const yearIndex = useTransform(scrollYProgress, [0, 1], [0, experience.highlights.length - 1]);

  return (
    <section id="experience" className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-36">
        <SectionLabel index="02">Experience</SectionLabel>

        <div
          ref={ref}
          className="mt-10 grid gap-10 sm:mt-14 sm:gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20"
        >
          {/* pinned company card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.24em] text-accent uppercase">
                {experience.period}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
                <RevealText text={experience.company} stagger={0.05} />
              </h2>
              <p className="mt-4 text-xl text-fg-muted">{experience.role}</p>
              <p className="mt-1 font-mono text-xs tracking-wide text-fg-faint">
                {experience.location}
              </p>
              <p className="mt-7 max-w-md leading-relaxed text-fg-muted">{experience.summary}</p>

              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="visit"
                className="group mt-8 inline-flex items-center gap-2 border-b border-border-strong pb-1 font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Company site
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>
          </div>

          {/* timeline */}
          <div className="relative pl-6 sm:pl-12">
            {/* rail */}
            <div aria-hidden className="absolute top-2 bottom-2 left-0 w-px bg-border">
              <motion.div
                className="h-full w-full origin-top bg-gradient-to-b from-accent to-cyan"
                style={{ scaleY: railScale }}
              />
            </div>

            <ol className="flex flex-col gap-12 sm:gap-20">
              {experience.highlights.map((h, i) => (
                <TimelineItem key={h.year} item={h} index={i} activeIndex={yearIndex} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  activeIndex,
}: {
  item: (typeof experience.highlights)[number];
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const dotScale = useTransform(activeIndex, [index - 0.6, index, index + 0.6], [1, 1.9, 1], {
    clamp: true,
  });

  return (
    <li className="relative">
      <motion.span
        aria-hidden
        className="absolute top-2.5 -left-6 h-2 w-2 rounded-full bg-accent sm:-left-12"
        style={{ scale: dotScale, translateX: "-50%", marginLeft: "0.5px" }}
      />
      <Reveal>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-sm text-accent">{item.year}</span>
          <h3 className="font-display text-[1.6rem] leading-tight tracking-tight sm:text-3xl">
            {item.title}
          </h3>
        </div>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fg-muted sm:text-base">
          {item.body}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border bg-bg-elev px-3 py-1 font-mono text-[11px] tracking-wide text-fg-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </li>
  );
}
