"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Don't hijack scrolling for users who prefer reduced motion.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Route same-page anchor clicks through Lenis for a smooth, tuned scroll
    // instead of the janky native jump (scroll-behavior is forced to auto).
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: -80, // clear the fixed navbar
        duration: 1.1,
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
