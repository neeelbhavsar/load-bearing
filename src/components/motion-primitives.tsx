"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade + rise on first entry. The workhorse reveal. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Word-by-word mask reveal. Each word rides up out of its own clipping box,
 * which reads far more deliberate than a whole-block fade.
 */
export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : undefined}
            transition={{
              duration: 0.85,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Container/child pair for staggered lists. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerList({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.ul
      ref={ref}
      className={className}
      variants={staggerParent}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.ul>
  );
}

/** Small monospace section marker, e.g. "02 / EXPERIENCE". */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <Reveal className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-fg-faint uppercase">
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-border-strong" aria-hidden />
      <span>{children}</span>
    </Reveal>
  );
}
