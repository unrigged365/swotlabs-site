"use client";

import { useEffect, useRef } from "react";

/**
 * Thin progress bar fixed to the top of the viewport, scaled by how far
 * the page has been scrolled. Uses transform (compositor-only) and rAF
 * throttling to stay cheap.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = barRef.current;
      if (!el) return;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
