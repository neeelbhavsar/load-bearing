"use client";

import { useEffect, useState } from "react";

/**
 * Subscribes to a media query. Returns `false` on the server and on first
 * paint, then settles — so never branch layout that must be right in SSR HTML
 * on this alone; use it for animation ranges.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
