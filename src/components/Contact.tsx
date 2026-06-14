"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", interest: "consulting", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".contact-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-content",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-px bg-accent" />
        <span className="text-xs text-accent tracking-[0.3em] uppercase font-mono">
          Let&apos;s talk
        </span>
      </div>

      <div className="max-w-4xl">
        <h2 className="contact-heading text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tight mb-12 leading-[1.05] opacity-0">
          Ready to build{" "}
          <span className="text-accent">something extraordinary</span>?
        </h2>

        <div className="contact-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 opacity-0">
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
                    setFormState({ name: "", email: "", interest: "consulting", message: "" });
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
                      className="absolute left-5 top-4 text-muted text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-accent peer-focus:bg-background peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-2"
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
                      className="absolute left-5 top-4 text-muted text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-accent peer-focus:bg-background peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-2"
                    >
                      Email address
                    </label>
                  </div>
                </div>

                {/* Service/Interest selection */}
                <div>
                  <label className="text-xs text-muted font-mono tracking-widest uppercase block mb-3">
                    Project Interest
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "consulting", label: "Strategy & Consulting" },
                      { id: "engineering", label: "ML Engineering" },
                      { id: "generative", label: "Generative AI" },
                      { id: "safety", label: "AI Safety / EU Act" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormState({ ...formState, interest: opt.id })}
                        className={`px-4 py-3 rounded-xl border text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                          formState.interest === opt.id
                            ? "bg-accent/10 border-accent text-accent"
                            : "border-border bg-surface/10 hover:border-accent/40 text-muted hover:text-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
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
                    className="absolute left-5 top-4 text-muted text-sm transition-all duration-300 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-accent peer-focus:bg-background peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-background peer-[:not(:placeholder-shown)]:px-2"
                  >
                    Your message
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-accent text-white rounded-xl text-sm font-medium tracking-wide hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_40px_var(--color-accent-border)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
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

