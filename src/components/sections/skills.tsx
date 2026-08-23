"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import { skills } from "@/content/portfolio";
import { SectionLabel, StaggerList, staggerChild } from "@/components/motion-primitives";

/**
 * Skills as oversized scrolling rows. Each group's row slides horizontally
 * against the page scroll (alternating direction), and hovering a skill dims
 * its neighbours so the one you're reading is the only lit thing.
 */
export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden border-t border-border py-20 sm:py-36">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionLabel index="06">Skills</SectionLabel>
      </div>

      <div className="mt-14 flex flex-col gap-10 sm:gap-14">
        {skills.map((group, i) => (
          <SkillRow key={group.group} group={group} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function SkillRow({ group, reverse }: { group: (typeof skills)[number]; reverse: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-12%", "6%"] : ["8%", "-10%"]);

  return (
    <div ref={ref} className="relative">
      <p className="mx-auto mb-3 max-w-[1400px] px-5 font-mono text-[11px] tracking-[0.24em] text-fg-faint uppercase sm:px-8">
        {group.group}
      </p>
      {/* Single nowrap line that deliberately runs past both edges, faded out at
          the margins — so the parallax drift reads as a moving band, not a
          broken wrap with words sliced in half. */}
      <div className="relative overflow-hidden">
        <motion.div style={reduced ? undefined : { x }} className="will-change-transform">
          <StaggerList className="flex w-max items-baseline gap-x-6 px-5 whitespace-nowrap sm:gap-x-10 sm:px-8">
            {group.items.map((item) => (
              <motion.li
                key={item}
                variants={staggerChild}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
                data-cursor=""
                className="cursor-default font-display text-[clamp(1.75rem,5vw,4rem)] leading-none tracking-[-0.03em] transition-[color,opacity] duration-300"
                style={{
                  opacity: hovered && hovered !== item ? 0.28 : 1,
                  color: hovered === item ? "var(--color-accent)" : undefined,
                }}
              >
                {item}
              </motion.li>
            ))}
          </StaggerList>
        </motion.div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg to-transparent sm:w-24"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg to-transparent sm:w-24"
        />
      </div>
    </div>
  );
}
