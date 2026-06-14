"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        if (el) {
          el.innerText = Math.floor(obj.val).toString() + suffix;
        }
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".about-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".stat-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-px bg-accent" />
        <span className="text-xs text-accent tracking-[0.3em] uppercase font-mono">
          Who we are
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <h2 className="about-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 opacity-0">
            Irish roots,{" "}
            <span className="text-accent">global ambition</span>
          </h2>
        </div>

        <div className="flex flex-col justify-center">
          <p className="about-text text-muted text-lg md:text-xl leading-relaxed mb-8 opacity-0">
            SwotLabs AGI Limited is a private limited company incorporated in
            Ireland, specialising in artificial intelligence services for
            enterprise. We bring together world-class AI researchers, engineers,
            and strategists to solve the hardest problems in energy, aviation,
            hospitality, utilities, and data infrastructure.
          </p>
          <p className="about-text text-muted text-lg md:text-xl leading-relaxed opacity-0">
            Our mission is to make advanced AI — including the path toward AGI —
            accessible, safe, and transformative for organisations that power
            everyday life.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-border">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item opacity-0">
            <StatCounter value={stat.value} />
            <span className="text-sm text-muted tracking-wide">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

