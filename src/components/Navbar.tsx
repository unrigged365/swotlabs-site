"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme, ThemeColor, themeOptions } from "@/providers/ThemeProvider";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <a href="#" className="text-xl font-bold tracking-tight">
          <span className="text-accent">swot</span>labs
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors duration-300 tracking-wide uppercase"
              data-cursor-hover
            >
              {link.label}
            </a>
          ))}

          {/* Theme Selector */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border bg-surface/30 backdrop-blur-sm">
            {(["lime", "cyan", "orange", "blue"] as ThemeColor[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 relative cursor-pointer ${
                  theme === t
                    ? "scale-110 ring-2 ring-offset-2 ring-offset-background ring-accent"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
                style={{
                  backgroundColor: themeOptions[t].accent,
                }}
                title={`Switch to ${t} theme`}
                data-cursor-hover
              />
            ))}
          </div>

          <a
            href="#contact"
            className="magnetic-btn px-6 py-2.5 border border-accent text-accent text-sm rounded-full hover:bg-accent hover:text-white transition-all duration-300"
            data-cursor-hover
          >
            Get in touch
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 z-[110]"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-background z-[105] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-light tracking-wide hover:text-accent transition-colors"
          >
            {link.label}
          </a>
        ))}

        {/* Theme Selector (Mobile) */}
        <div className="flex items-center gap-4 mt-8 px-4 py-2 rounded-full border border-border bg-surface/50">
          {(["lime", "cyan", "orange", "blue"] as ThemeColor[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTheme(t);
                setMenuOpen(false);
              }}
              className={`w-6 h-6 rounded-full transition-all duration-300 relative cursor-pointer ${
                theme === t
                  ? "scale-110 ring-2 ring-offset-2 ring-offset-background ring-accent"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{
                backgroundColor: themeOptions[t].accent,
              }}
              title={`Switch to ${t} theme`}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

