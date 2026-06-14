"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";
import { useReveal } from "@/lib/useReveal";

const interestOptions = [
  { id: "consulting", label: "Strategy & Consulting" },
  { id: "engineering", label: "ML Engineering" },
  { id: "generative", label: "Generative AI" },
  { id: "safety", label: "AI Safety / EU Act" },
] as const;

type Interest = (typeof interestOptions)[number]["id"];

// Broad list of enterprise industries SwotLabs may work with.
const industries = [
  "Energy & Utilities",
  "Aviation & Aerospace",
  "Automotive",
  "Banking & Financial Services",
  "Insurance",
  "Healthcare & Life Sciences",
  "Pharmaceuticals & Biotech",
  "Retail & E-commerce",
  "Consumer Goods (FMCG)",
  "Hospitality & Travel",
  "Telecommunications",
  "Media & Entertainment",
  "Technology & Software",
  "Manufacturing & Industrial",
  "Logistics & Supply Chain",
  "Construction & Real Estate",
  "Agriculture & Food",
  "Mining & Metals",
  "Oil & Gas",
  "Public Sector & Government",
  "Education",
  "Legal & Professional Services",
  "Marketing & Advertising",
  "Non-Profit & NGO",
  "Other",
] as const;

export default function Contact() {
  const headingRef = useReveal<HTMLHeadingElement>();
  const contentRef = useReveal<HTMLDivElement>({ delay: 100 });
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    company: string;
    industry: string;
    interest: Interest;
    message: string;
  }>({ name: "", email: "", company: "", industry: "", interest: "consulting", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <SectionLabel>Let&apos;s talk</SectionLabel>

      <div className="max-w-4xl">
        <h2
          ref={headingRef}
          className="reveal text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tight mb-12 leading-[1.05]"
        >
          Ready to build{" "}
          <span className="text-accent">something extraordinary</span>?
        </h2>

        <div ref={contentRef} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact details */}
          <div className="lg:col-span-4 space-y-8">
            <p className="text-muted text-lg leading-relaxed">
              Whether you&apos;re exploring AI for the first time or scaling
              existing capabilities, we&apos;d love to hear from you.
            </p>

            <div className="pt-4 space-y-6">
              <div>
                <span className="text-xs text-muted tracking-widest uppercase font-mono block mb-2">
                  Email
                </span>
                <a href="mailto:hello@swotlabs.com" className="text-foreground hover:text-accent transition-colors" data-cursor-hover>
                  hello@swotlabs.com
                </a>
              </div>
              <div>
                <span className="text-xs text-muted tracking-widest uppercase font-mono block mb-2">
                  Location
                </span>
                <p className="text-foreground">Dublin, Ireland</p>
              </div>
              <div>
                <span className="text-xs text-muted tracking-widest uppercase font-mono block mb-2">
                  Focus
                </span>
                <p className="text-foreground">Enterprise AI & AGI</p>
              </div>
            </div>
          </div>

          {/* Form container */}
          <div className="lg:col-span-8">
            {isSubmitted ? (
              <div className="bg-surface/30 border border-border p-8 md:p-10 rounded-2xl text-center space-y-6">
                <div className="w-16 h-16 bg-accent/15 text-accent rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Message Received</h3>
                <p className="text-muted leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out, <strong>{formState.name}</strong>. An AI solutions engineer from our Dublin team will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setError(null);
                    setFormState({ name: "", email: "", company: "", industry: "", interest: "consulting", message: "" });
                  }}
                  className="px-6 py-2.5 border border-border rounded-full hover:border-accent text-sm transition-colors duration-300 cursor-pointer"
                  data-cursor-hover
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-surface/30 border border-border rounded-xl px-5 py-4 text-foreground placeholder-transparent focus:outline-none focus:border-accent transition-colors duration-300 peer"
                      id="name"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-3 top-1/2 -translate-y-1/2 px-2 text-muted text-base bg-transparent transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-focus:bg-background peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-background"
                    >
                      Name
                    </label>
                  </div>
                  {/* Email */}
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-surface/30 border border-border rounded-xl px-5 py-4 text-foreground placeholder-transparent focus:outline-none focus:border-accent transition-colors duration-300 peer"
                      id="email"
                      placeholder="Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-3 top-1/2 -translate-y-1/2 px-2 text-muted text-base bg-transparent transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-focus:bg-background peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-background"
                    >
                      Email address
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="relative group">
                    <input
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full bg-surface/30 border border-border rounded-xl px-5 py-4 text-foreground placeholder-transparent focus:outline-none focus:border-accent transition-colors duration-300 peer"
                      id="company"
                      placeholder="Company"
                    />
                    <label
                      htmlFor="company"
                      className="absolute left-3 top-1/2 -translate-y-1/2 px-2 text-muted text-base bg-transparent transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-focus:bg-background peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-background"
                    >
                      Company
                    </label>
                  </div>

                  {/* Industry dropdown */}
                  <div className="relative group">
                    <select
                      id="industry"
                      value={formState.industry}
                      onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                      className={`w-full appearance-none bg-surface/30 border border-border rounded-xl px-5 py-4 pr-10 focus:outline-none focus:border-accent transition-colors duration-300 cursor-pointer ${
                        formState.industry ? "text-foreground" : "text-muted"
                      }`}
                      data-cursor-hover
                    >
                      <option value="" disabled>
                        Select your industry
                      </option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind} className="bg-surface text-foreground">
                          {ind}
                        </option>
                      ))}
                    </select>
                    {/* Chevron */}
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>

                {/* Service/Interest selection */}
                <div>
                  <span
                    id="interest-label"
                    className="text-xs text-muted font-mono tracking-widest uppercase block mb-3"
                  >
                    Project Interest
                  </span>
                  <div
                    role="radiogroup"
                    aria-labelledby="interest-label"
                    className="grid grid-cols-2 gap-3"
                  >
                    {interestOptions.map((opt) => {
                      const selected = formState.interest === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setFormState({ ...formState, interest: opt.id })}
                          className={`px-4 py-3 rounded-xl border text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                            selected
                              ? "bg-accent/10 border-accent text-accent"
                              : "border-border bg-surface/10 hover:border-accent/40 text-muted hover:text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-surface/30 border border-border rounded-xl px-5 py-4 text-foreground placeholder-transparent focus:outline-none focus:border-accent transition-colors duration-300 peer resize-none"
                    id="message"
                    placeholder="Your message"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-3 top-4 px-2 text-muted text-base bg-transparent transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-focus:bg-background peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-background"
                  >
                    Your message
                  </label>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-accent text-background rounded-xl text-sm font-medium tracking-wide hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_40px_var(--color-accent-border)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  data-cursor-hover
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

