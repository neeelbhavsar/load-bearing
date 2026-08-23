"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Lenis binds a global wheel/touch listener and drives `window.scrollTo` itself,
 * so `body { overflow: hidden }` alone does NOT stop the page moving behind an
 * overlay — the wheel event still reaches Lenis. Anything that opens a modal or
 * sheet has to tell Lenis to stand down, which is what this module is for.
 *
 * SmoothScroll registers its instance here; overlays call useScrollLock(open).
 */
let instance: Lenis | null = null;
let locks = 0;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

function apply(locked: boolean) {
  // lenis.stop() adds .lenis-stopped, which is where overflow:hidden comes from
  // (see globals.css). With reduced motion there is no instance, so lock the
  // document element directly instead.
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

/** Freeze page scrolling for as long as `active` is true. Nesting-safe. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    apply(true);
    return () => {
      locks -= 1;
      if (locks === 0) apply(false);
    };
  }, [active]);
}
