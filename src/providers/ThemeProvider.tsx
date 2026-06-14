"use client";

import { createContext, useContext, useEffect, useState } from "react";

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

type ThemeContextType = {
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  currentColors: typeof themeOptions[ThemeColor];
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeColor>("lime");

  useEffect(() => {
    // Load preference from localStorage if available
    const saved = localStorage.getItem("swotlabs-theme") as ThemeColor;
    if (saved && themeOptions[saved]) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const colors = themeOptions[theme];

    // Update CSS variables
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-accent-light", colors.accentLight);
    root.style.setProperty("--color-accent-soft", colors.accentSoft);
    root.style.setProperty("--color-accent-border", colors.accentBorder);

    // Save to localStorage
    localStorage.setItem("swotlabs-theme", theme);
  }, [theme]);

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
