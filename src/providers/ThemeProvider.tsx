"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

export type ThemeColor = "lime" | "cyan" | "orange" | "blue";

export const themeOptions = {
  lime: {
    accent: "#84cc16",
    accentLight: "#a3e635",
    accentSoft: "rgba(132, 204, 22, 0.16)",
    accentBorder: "rgba(132, 204, 22, 0.45)",
  },
  cyan: {
    accent: "#22d3ee",
    accentLight: "#67e8f9",
    accentSoft: "rgba(34, 211, 238, 0.16)",
    accentBorder: "rgba(34, 211, 238, 0.45)",
  },
  orange: {
    accent: "#f97316",
    accentLight: "#fb923c",
    accentSoft: "rgba(249, 115, 22, 0.18)",
    accentBorder: "rgba(249, 115, 22, 0.45)",
  },
  blue: {
    accent: "#2563eb",
    accentLight: "#3b82f6",
    accentSoft: "rgba(37, 99, 235, 0.2)",
    accentBorder: "rgba(59, 130, 246, 0.45)",
  },
};

export const THEME_STORAGE_KEY = "swotlabs-theme";

export type ThemeColors = (typeof themeOptions)[ThemeColor];

type ThemeContextType = {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  currentColors: ThemeColors;
};

/**
 * Inline script run in <head> before paint. Reads the saved accent and sets
 * the CSS custom properties so there's no first-frame color flash. Kept as a
 * plain string (no closures) because it's injected via dangerouslySetInnerHTML.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var o=${JSON.stringify(
  themeOptions
)};var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(!t||!o[t])t="lime";var c=o[t],r=document.documentElement.style;r.setProperty("--color-accent",c.accent);r.setProperty("--color-accent-light",c.accentLight);r.setProperty("--color-accent-soft",c.accentSoft);r.setProperty("--color-accent-border",c.accentBorder);}catch(e){}})();`;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start from the default so the first client render matches the SSR
  // markup (no hydration mismatch). The inline THEME_INIT_SCRIPT already set
  // the CSS variables from localStorage before paint, so there's no color
  // flash; we sync React state to the saved value right after mount below.
  const [theme, setThemeState] = useState<ThemeColor>("lime");
  const hydrated = useRef(false);

  // Load the saved preference once, after hydration.
  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeColor | null;
    if (saved && themeOptions[saved] && saved !== "lime") {
      setThemeState(saved);
    }
    hydrated.current = true;
  }, []);

  // Apply CSS variables + persist whenever the theme changes — but skip the
  // initial render, since the inline script already applied the saved colors.
  useEffect(() => {
    if (!hydrated.current) return;

    const root = document.documentElement;
    const colors = themeOptions[theme];

    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-accent-light", colors.accentLight);
    root.style.setProperty("--color-accent-soft", colors.accentSoft);
    root.style.setProperty("--color-accent-border", colors.accentBorder);

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = setThemeState;

  const currentColors = themeOptions[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
