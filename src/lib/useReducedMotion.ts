"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Tracks the user's prefers-reduced-motion setting reactively.
 * Returns `false` on the server / first render, then syncs after mount
 * so SSR markup stays stable (no hydration mismatch).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    setReduced(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Synchronous read for use inside effects / event handlers. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}
