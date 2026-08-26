"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Blend-mode cursor. Follows with spring lag, swells over anything marked
 * `data-cursor` and shows that element's label. Gated to fine pointers with
 * motion enabled — via CSS, so there's no client/server mismatch.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const hit = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setActive(Boolean(hit));
      setLabel(hit?.dataset.cursor || null);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden mix-blend-difference motion-reduce:!hidden [@media(pointer:fine)]:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-white font-mono text-[10px] font-medium tracking-widest text-black uppercase"
        /* The x/y offsets are always half the matching size — that is what
           centres the circle on the real pointer position. Change a size and
           its offset has to move with it, or the cursor sits off-centre. */
        animate={{
          width: active ? (label ? 92 : 52) : 14,
          height: active ? (label ? 92 : 52) : 14,
          x: active ? (label ? -46 : -26) : -7,
          y: active ? (label ? -46 : -26) : -7,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
