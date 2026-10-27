"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerLenis } from "@/lib/scroll-lock";

/**
 * Lenis-driven inertial scrolling. Every scroll-linked animation on the page
 * reads from the same rAF loop, so nothing lags a frame behind the page.
 * Opt out entirely when the user asks for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: Lenis | null = null;
    let frame = 0;

    // in-page anchors need to go through Lenis, not native scrolling
    const onClick = (e: MouseEvent) => {
      if (!lenis) return;
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute("href");
      if (!anchor || !hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -8 });
    };

    // Started once the main thread is idle rather than during hydration: its
    // rAF loop and listeners are pure enhancement, and native scrolling covers
    // the first moments. Safari has no requestIdleCallback, hence the fallback.
    const start = () => {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.6,
      });
      registerLenis(lenis);

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      document.addEventListener("click", onClick);
    };

    const idle = "requestIdleCallback" in window;
    const handle = idle
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 200);

    return () => {
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      if (lenis) {
        registerLenis(null);
        lenis.destroy();
      }
    };
  }, []);

  return null;
}
