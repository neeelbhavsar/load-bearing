"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { services } from "@/content/portfolio";
import { Reveal, RevealText, SectionLabel } from "@/components/motion-primitives";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Capability list: rows that expand into their detail. Keeps the section to text
 * and rules — the site already spends its image budget on the hero portrait.
 *
 * Pointer devices expand on hover/focus. Touch devices have no hover, which
 * previously meant row 01 was the only one that ever opened, so there the rows
 * are tappable accordion headers instead.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const coarse = useMediaQuery("(pointer: coarse)");

  return (
    <section id="services" className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-36">
        <SectionLabel index="04">{services.heading}</SectionLabel>

        <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
              <RevealText text="Four things," stagger={0.05} />
              <br />
              <span className="text-fg-muted italic">
                <RevealText text="end to end" delay={0.14} stagger={0.05} />
              </span>
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-sm leading-relaxed text-fg-muted">{services.intro}</p>
            </Reveal>
          </div>

          <ul className="flex flex-col border-t border-border">
            {services.items.map((item, i) => {
              const isActive = active === i;
              return (
                <li key={item.title} className="border-b border-border">
                  <Reveal delay={i * 0.06}>
                    <div
                      onMouseEnter={coarse ? undefined : () => setActive(i)}
                      data-cursor=""
                      className="group relative py-6 sm:py-9"
                    >
                      {/* accent rule that draws in on the active row */}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-px h-px origin-left transition-transform duration-700 ease-out"
                        style={{
                          background: item.accent,
                          transform: `scaleX(${isActive ? 1 : 0})`,
                        }}
                      />

                      {/* The header line is the control: hover opens a row on
                          pointer devices, tap toggles it on touch. */}
                      <button
                        type="button"
                        onFocus={coarse ? undefined : () => setActive(i)}
                        onClick={() => setActive(isActive ? -1 : i)}
                        aria-expanded={isActive}
                        className="flex w-full items-baseline gap-4 text-left outline-none sm:gap-6"
                      >
                        <span
                          className="font-mono text-[11px] tracking-[0.2em] transition-colors duration-500"
                          style={{
                            color: isActive ? item.accent : "var(--color-fg-faint)",
                          }}
                        >
                          0{i + 1}
                        </span>
                        <h3
                          className="font-display text-[1.6rem] leading-tight tracking-tight transition-colors duration-500 sm:text-[2rem]"
                          style={{ color: isActive ? item.accent : undefined }}
                        >
                          {item.title}
                        </h3>
                        <ChevronDown
                          size={18}
                          aria-hidden
                          className="ml-auto shrink-0 self-center text-fg-faint transition-transform duration-500"
                          style={{
                            transform: isActive ? "rotate(180deg)" : "none",
                          }}
                        />
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 max-w-xl leading-relaxed text-fg-muted sm:mt-5">
                          {item.body}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                          {item.points.map((p) => (
                            <li
                              key={p}
                              className="rounded-full border border-border bg-bg-elev px-3 py-1 font-mono text-[11px] tracking-wide text-fg-muted"
                            >
                              {p}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
