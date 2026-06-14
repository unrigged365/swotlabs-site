"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "./SectionLabel";
import { useReveal } from "@/lib/useReveal";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "50+", label: "AI Projects Delivered" },
  { value: "6+", label: "Enterprise Clients" },
  { value: "98%", label: "Client Retention" },
  { value: "IE/UK", label: "Headquartered" },
];

function StatCounter({ value }: { value: string }) {
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return; // Non-numeric values like "IE/UK" do not count up

    const targetNumber = parseInt(match[1], 10);
    const suffix = match[2];

    // Reduced motion: show the final value, skip the count-up.
    if (prefersReducedMotion()) {
      el.innerText = targetNumber.toString() + suffix;
      return;
    }

    const obj = { val: 0 };
    const anim = gsap.to(obj, {
      val: targetNumber,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
      },
      onUpdate: () => {
        el.innerText = Math.floor(obj.val).toString() + suffix;
      },
    });

    return () => {
      anim.kill();
    };
  }, [value]);

  return (
    <span ref={elementRef} className="text-4xl md:text-5xl font-bold text-accent block mb-2">
      {value}
    </span>
  );
}

export default function About() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const textRef = useReveal<HTMLDivElement>({ stagger: 120 });
  const statsRef = useReveal<HTMLDivElement>({ stagger: 90 });

  return (
    <section id="about" className="section-padding relative">
      <SectionLabel>Who we are</SectionLabel>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <h2
            ref={headingRef}
            className="reveal text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
          >
            Irish roots, <span className="text-accent">global ambition</span>
          </h2>
        </div>

        <div ref={textRef} className="flex flex-col justify-center">
          <p
            data-reveal-child
            className="reveal text-muted text-lg md:text-xl leading-relaxed mb-8"
          >
            SwotLabs AGI Limited is a private limited company incorporated in
            Ireland, specialising in artificial intelligence services for
            enterprise. We bring together world-class AI researchers, engineers,
            and strategists to solve the hardest problems in energy, aviation,
            hospitality, utilities, and data infrastructure.
          </p>
          <p
            data-reveal-child
            className="reveal text-muted text-lg md:text-xl leading-relaxed"
          >
            Our mission is to make advanced AI — including the path toward AGI —
            accessible, safe, and transformative for organisations that power
            everyday life.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-border"
      >
        {stats.map((stat) => (
          <div key={stat.label} data-reveal-child className="reveal">
            <StatCounter value={stat.value} />
            <span className="text-sm text-muted tracking-wide">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
