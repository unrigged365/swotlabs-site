"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";
import { useReveal } from "@/lib/useReveal";

const faqs = [
  {
    question: "What services does SwotLabs specialize in?",
    answer:
      "We deliver end-to-end AI consulting, ML engineering, Generative AI integration, and robust MLOps. Our engineers build custom models, fine-tune LLMs, design retrieval-augmented generation (RAG) systems, and configure intelligent agent systems tailored to enterprise workflows.",
  },
  {
    question: "How do you ensure AI safety and regulatory compliance?",
    answer:
      "We design responsible AI frameworks aligned with international standards and the EU AI Act. Our services include bias audits, explainability instrumentation, model lineage tracking, risk assessment documentation, and safe-by-design development practices.",
  },
  {
    question: "Which industries do you partner with?",
    answer:
      "We partner with industry-leading enterprise clients across sectors that power everyday life, including energy distribution (e.g., UKPN), aviation (e.g., Virgin Atlantic), hospitality, utilities (e.g., Northumbrian Water), and secure data platforms.",
  },
  {
    question: "How does the path to AGI impact enterprise strategies today?",
    answer:
      "We believe true capability scales incrementally. By designing enterprise workflows that leverage state-of-the-art agent systems today, we build architectures ready to adapt as model cognitive capabilities approach artificial general intelligence (AGI), ensuring long-term technological stability.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const headingRef = useReveal<HTMLDivElement>({ stagger: 120 });
  const listRef = useReveal<HTMLDivElement>({ stagger: 90 });

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding relative">
      <SectionLabel>FAQ</SectionLabel>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div ref={headingRef} className="lg:col-span-5">
          <h2
            data-reveal-child
            className="reveal text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
          >
            Frequently <br className="hidden md:block" />
            asked <span className="text-accent">questions</span>
          </h2>
          <p data-reveal-child className="reveal text-muted text-lg leading-relaxed max-w-sm">
            Everything you need to know about our capabilities, process, safety
            compliance, and vision.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div ref={listRef} className="divide-y divide-border">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;
              return (
                <div key={index} data-reveal-child className="reveal py-6">
                  <button
                    id={buttonId}
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    data-cursor-hover
                  >
                    <span className="text-lg md:text-xl font-medium group-hover:text-accent transition-colors duration-300">
                      {faq.question}
                    </span>
                    <span
                      className={`w-6 h-6 border border-border rounded-full flex items-center justify-center shrink-0 ml-4 group-hover:border-accent transition-all duration-300 ${
                        isOpen ? "bg-accent border-accent text-background rotate-45" : "text-muted"
                      }`}
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl pb-2">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
