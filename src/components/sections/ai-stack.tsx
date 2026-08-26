"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { aiStack } from "@/content/portfolio";
import { Reveal, RevealText, SectionLabel } from "@/components/motion-primitives";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * The AI tools I actually work with, as a card grid. Each card tilts toward the
 * pointer and lights a radial spotlight in its own accent — motion that tracks
 * the finger, not a timed flourish.
 */
export function AiStack() {
  return (
    <section id="ai" className="relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-36">
        <SectionLabel index="05">{aiStack.heading}</SectionLabel>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">
              <RevealText text="I build with AI," stagger={0.05} />
              <br />
              <span className="text-accent italic">
                <RevealText text="daily" delay={0.16} stagger={0.05} />
              </span>
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-md leading-relaxed text-fg-muted">{aiStack.intro}</p>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {aiStack.tools.map((tool, i) => (
              <Reveal
                key={tool.name}
                delay={i * 0.08}
                /* Two columns means an odd number of tools leaves the last card
                   with a hole beside it. Run the final one full width instead,
                   so the grid closes cleanly at any count. */
                className={
                  aiStack.tools.length % 2 === 1 && i === aiStack.tools.length - 1
                    ? "sm:col-span-2"
                    : undefined
                }
              >
                <TiltCard accent={tool.accent}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3
                      className="font-display text-2xl tracking-tight sm:text-3xl"
                      style={{ color: tool.accent }}
                    >
                      {tool.name}
                    </h3>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-fg-faint uppercase">
                      {tool.role}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-fg-muted sm:mt-5 sm:text-base">
                    {tool.desc}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TiltCard({ accent, children }: { accent: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // A finger dragging across the card tilts it while you're trying to read —
  // pointer-tracking is for mice.
  const coarse = useMediaQuery("(pointer: coarse)");
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const active = useMotionValue(0);

  const rx = useSpring(useTransform(py, [0, 1], [5, -5]), {
    stiffness: 260,
    damping: 26,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-5, 5]), {
    stiffness: 260,
    damping: 26,
  });
  const spotlight = useTransform(
    [px, py] as const,
    ([x, y]: number[]) =>
      // 1a ≈ 10% alpha — the card's own accent, so each tool lights differently
      `radial-gradient(320px circle at ${x * 100}% ${y * 100}%, ${accent}1a, transparent 70%)`,
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        if (coarse) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        active.set(1);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
        active.set(0);
      }}
      style={coarse ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="relative h-full overflow-hidden rounded-2xl border border-border bg-bg-elev p-5 transition-colors duration-500 hover:border-border-strong sm:p-8"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ opacity: active, background: spotlight }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
