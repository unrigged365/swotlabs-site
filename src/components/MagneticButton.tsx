"use client";

import { useRef, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Pull strength (0–1). Higher = follows the cursor more. */
  strength?: number;
};

/**
 * Anchor that subtly drifts toward the cursor while hovered, then springs
 * back on leave. No-ops under prefers-reduced-motion. Replaces the dead
 * `.magnetic-btn` class that previously had no behavior.
 */
export default function MagneticButton({
  href,
  children,
  className = "",
  strength = 0.4,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-flex items-center justify-center text-center whitespace-nowrap will-change-transform transition-transform duration-300 ease-out ${className}`}
      data-cursor-hover
    >
      {children}
    </a>
  );
}
