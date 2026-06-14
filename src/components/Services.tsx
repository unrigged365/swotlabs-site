"use client";

import SectionLabel from "./SectionLabel";
import { useReveal } from "@/lib/useReveal";

const services = [
  {
    number: "01",
    title: "AI Strategy & Consulting",
    description:
      "We partner with enterprise leaders to define AI roadmaps, identify high-impact use cases, and build scalable adoption frameworks.",
    tags: ["Strategy", "Roadmapping", "ROI Analysis"],
  },
  {
    number: "02",
    title: "Machine Learning Engineering",
    description:
      "Custom ML model development, training, and deployment — from NLP and computer vision to predictive analytics and recommendation systems.",
    tags: ["NLP", "Computer Vision", "Predictive Models"],
  },
  {
    number: "03",
    title: "Generative AI Solutions",
    description:
      "Enterprise-grade generative AI applications, including RAG pipelines, intelligent agents, fine-tuned LLMs, and multimodal AI systems.",
    tags: ["LLMs", "RAG", "AI Agents"],
  },
  {
    number: "04",
    title: "Data Engineering & MLOps",
    description:
      "End-to-end data pipeline architecture, feature stores, model monitoring, and CI/CD for ML — ensuring reliability at scale.",
    tags: ["Pipelines", "MLOps", "Monitoring"],
  },
  {
    number: "05",
    title: "AI Safety & Governance",
    description:
      "Responsible AI frameworks, bias auditing, explainability tooling, and compliance with EU AI Act and emerging regulations.",
    tags: ["Governance", "Ethics", "Compliance"],
  },
];

export default function Services() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const listRef = useReveal<HTMLDivElement>({ stagger: 110 });

  return (
    <section id="services" className="section-padding relative">
      <SectionLabel>What we do</SectionLabel>

      <h2
        ref={headingRef}
        className="reveal text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-20 max-w-4xl"
      >
        AI services that <span className="text-accent">transform</span> enterprise
      </h2>

      <div ref={listRef} className="space-y-0">
        {services.map((service) => (
          <div
            key={service.number}
            data-reveal-child
            className="reveal service-card group border-t border-border py-10 md:py-14 transition-colors duration-300 hover:bg-surface/20"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
              <span className="text-accent font-mono text-sm shrink-0 md:pt-1.5">
                {service.number}
              </span>
              <div className="flex-1">
                <h3 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs border border-border rounded-full text-muted group-hover:border-accent/30 group-hover:text-accent/70 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden md:block shrink-0 self-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent -rotate-45"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}
