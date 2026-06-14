"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "UKPN", sector: "Energy", logo: "/logos/ukpn.png" },
  { name: "Virgin Atlantic", sector: "Aviation", logo: "/logos/virgin_atlantic.png" },
  { name: "Greene King", sector: "Hospitality", logo: "/logos/greeneking.png" },
  { name: "Northumbrian Water", sector: "Utilities", logo: "/logos/nwg.webp" },
  { name: "CK Delta", sector: "Data Platforms", logo: "/logos/ckdelta.avif" },
  { name: "CK Hutchison", sector: "Conglomerate", logo: "/logos/ckhh.png" },
  { name: "Civitas Social Housing", sector: "Real Estate Leasing", logo: "/logos/civitas.png" },
  { name: "Invicara", sector: "Digital Twins", logo: "/logos/invicara.jpg" },
  { name: "Circana", sector: "Market Research", logo: "/logos/circana.webp" },
  { name: "The NPD Group", sector: "Consumer Data", logo: "/logos/npd.png" },
];

const marqueeClients = [...clients, ...clients];

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".clients-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".clients-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".clients-marquee-container",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".clients-marquee-container",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="clients" className="section-padding py-16 md:py-24 relative overflow-hidden">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-px bg-accent" />
        <span className="text-xs text-accent tracking-[0.3em] uppercase font-mono">
          Trusted by
        </span>
      </div>

      <h2 className="clients-heading text-4xl md:text-6xl font-bold tracking-tight mb-16 max-w-4xl opacity-0">
        Partnering with <span className="text-accent">industry leaders</span>
      </h2>

      {/* Marquee container with fade edges */}
      <div
        className="clients-marquee-container w-full overflow-hidden py-4 relative opacity-0"
        style={{
          marginTop: "120px",
          maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max">
          {marqueeClients.map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-6 px-8 py-5 border border-border bg-surface/20 rounded-2xl shrink-0 backdrop-blur-sm mx-10 hover:border-accent/30 transition-all duration-300 min-w-[340px]"
            >
              {/* Logo Icon Container */}
              <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-white/5 rounded-xl border border-white/10 p-2 overflow-hidden">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-80"
                />
              </div>

              {/* Text metadata */}
              <div className="flex flex-col justify-center">
                <span className="text-[10px] text-accent font-mono tracking-[0.2em] uppercase mb-1">
                  {client.sector}
                </span>
                <span className="text-base md:text-lg font-bold tracking-tight text-foreground">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

