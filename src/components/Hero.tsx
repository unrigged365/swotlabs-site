"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      badgeRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        subRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm mb-8 opacity-0"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs text-muted tracking-widest uppercase font-mono">
            Irish AI Innovation
          </span>
        </div>

        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[0.95] tracking-tight mb-8 opacity-0"
        >
          <span className="block">Building the</span>
          <span className="block mt-2">
            future with{" "}
            <span className="text-accent relative">
              AGI
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 8C50 2 150 2 198 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>
          </span>
        </h1>

        <p
          ref={subRef}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed opacity-0"
        >
          SwotLabs AGI Limited is an Ireland-based AI services company delivering
          transformative intelligence solutions to enterprise clients across the UK & Europe.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center opacity-0">
          <a
            href="#services"
            className="magnetic-btn px-8 py-4 bg-accent text-white rounded-full text-sm font-medium tracking-wide hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_40px_var(--color-accent-border)]"
            data-cursor-hover
          >
            Explore our services
          </a>
          <a
            href="#clients"
            className="magnetic-btn px-8 py-4 border border-border text-foreground rounded-full text-sm font-medium tracking-wide hover:border-accent hover:text-accent transition-all duration-300"
            data-cursor-hover
          >
            View our work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted tracking-widest uppercase font-mono">Scroll</span>
        <div className="w-5 h-8 border border-muted/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-accent rounded-full mt-1.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
