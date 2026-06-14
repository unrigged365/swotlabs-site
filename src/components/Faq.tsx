"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".faq-item-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="section-padding relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-px bg-accent" />
        <span className="text-xs text-accent tracking-[0.3em] uppercase font-mono">
          FAQ
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="faq-heading text-4xl md:text-6xl font-bold tracking-tight mb-6 opacity-0 leading-tight">
            Frequently <br className="hidden md:block" />
            asked <span className="text-accent">questions</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed max-w-sm">
            Everything you need to know about our capabilities, process, safety compliance, and vision.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="faq-list divide-y divide-border">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div key={index} className="faq-item-anim py-6 opacity-0">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                    aria-expanded={isOpen}
                    data-cursor-hover
                  >
                    <span className="text-lg md:text-xl font-medium group-hover:text-accent transition-colors duration-300">
                      {faq.question}
                    </span>
                    <span
                      className={`w-6 h-6 border border-border rounded-full flex items-center justify-center shrink-0 ml-4 group-hover:border-accent transition-all duration-300 ${
                        isOpen ? "bg-accent border-accent text-white rotate-45" : "text-muted"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>

                  <div
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
