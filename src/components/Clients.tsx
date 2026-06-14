"use client";

import Image from "next/image";
import SectionLabel from "./SectionLabel";
import { useReveal } from "@/lib/useReveal";

const clients = [
  { name: "UKPN", sector: "Energy", logo: "/logos/ukpn.png" },
  { name: "Virgin Atlantic", sector: "Aviation", logo: "/logos/virgin_atlantic.png" },
  { name: "Greene King", sector: "Hospitality", logo: "/logos/greeneking.png" },
  { name: "Northumbrian Water", sector: "Utilities", logo: "/logos/nwg.webp" },
  { name: "CK Delta", sector: "Data Platforms", logo: "/logos/ckdelta.png" },
  { name: "CK Hutchison", sector: "Conglomerate", logo: "/logos/ckhh.png" },
  { name: "Civitas Social Housing", sector: "Real Estate Leasing", logo: "/logos/civitas.png" },
  { name: "Invicara", sector: "Digital Twins", logo: "/logos/invicara.jpg" },
  { name: "Circana", sector: "Market Research", logo: "/logos/circana.webp" },
  { name: "The NPD Group", sector: "Consumer Data", logo: "/logos/npd.png" },
];

const marqueeClients = [...clients, ...clients];

export default function Clients() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const marqueeRef = useReveal<HTMLDivElement>({ delay: 100 });

  return (
    <section
      id="clients"
      className="section-padding py-16 md:py-24 relative overflow-hidden"
    >
      <SectionLabel>Trusted by</SectionLabel>

      <h2
        ref={headingRef}
        className="reveal text-4xl md:text-6xl font-bold tracking-tight max-w-4xl"
      >
        Partnering with <span className="text-accent">industry leaders</span>
      </h2>

      {/* Spacer between heading and the logo band (explicit, can't collapse). */}
      <div aria-hidden className="h-24 md:h-32" />

      {/* White band — only the scrolling logo row has a white background. */}
      <div
        ref={marqueeRef}
        className="reveal w-full overflow-hidden py-8 relative bg-white rounded-2xl"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, white 12%, white 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, white 12%, white 88%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max items-center">
          {marqueeClients.map((client, i) => (
            <div
              key={i}
              className="h-24 w-[180px] sm:w-[220px] flex items-center justify-center shrink-0 mx-6 sm:mx-10"
            >
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={220}
                height={96}
                className="max-h-16 sm:max-h-20 max-w-full w-auto h-auto object-contain opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
