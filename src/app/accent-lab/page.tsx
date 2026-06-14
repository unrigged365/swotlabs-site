import type { Metadata } from "next";
import styles from "./page.module.css";

type AccentOption = {
  name: string;
  accent: string;
  hover: string;
  soft: string;
  border: string;
  textOnAccent: "#001018" | "#111111" | "#ffffff";
  profile: string;
};

const accentOptions: AccentOption[] = [
  {
    name: "Electric Cyan",
    accent: "#22d3ee",
    hover: "#67e8f9",
    soft: "rgba(34, 211, 238, 0.16)",
    border: "rgba(34, 211, 238, 0.45)",
    textOnAccent: "#001018",
    profile: "Most fluorescent. Great for AI and data-forward brand language.",
  },
  {
    name: "Neon Lime",
    accent: "#84cc16",
    hover: "#a3e635",
    soft: "rgba(132, 204, 22, 0.16)",
    border: "rgba(132, 204, 22, 0.45)",
    textOnAccent: "#111111",
    profile: "Very high visibility. Feels experimental and energetic.",
  },
  {
    name: "Signal Orange",
    accent: "#f97316",
    hover: "#fb923c",
    soft: "rgba(249, 115, 22, 0.18)",
    border: "rgba(249, 115, 22, 0.45)",
    textOnAccent: "#111111",
    profile: "Strong call-to-action accent with clear hierarchy on dark UI.",
  },
  {
    name: "Cobalt Blue",
    accent: "#2563eb",
    hover: "#3b82f6",
    soft: "rgba(37, 99, 235, 0.2)",
    border: "rgba(59, 130, 246, 0.45)",
    textOnAccent: "#ffffff",
    profile: "Most enterprise-safe while keeping strong contrast.",
  },
];

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const normalized =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;

  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function luminanceChannel(channel: number) {
  const n = channel / 255;
  return n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * luminanceChannel(r) +
    0.7152 * luminanceChannel(g) +
    0.0722 * luminanceChannel(b)
  );
}

function contrastRatio(foreground: string, background: string) {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export const metadata: Metadata = {
  title: "Accent Lab",
  description: "Standalone accent comparison UI for selecting a stronger color direction.",
};

export default function AccentLabPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.kicker}>Standalone sample UI</p>
        <h1 className={styles.title}>Accent Lab</h1>
        <p className={styles.subtitle}>
          Compare fluorescent and high-contrast accent systems without touching the
          existing homepage sections.
        </p>
      </section>

      <section className={styles.grid}>
        {accentOptions.map((option) => {
          const contrastOnBackground = contrastRatio(option.accent, "#050505").toFixed(2);
          const contrastButtonText = contrastRatio(option.textOnAccent, option.accent).toFixed(2);

          return (
            <article
              key={option.name}
              className={styles.card}
              style={
                {
                  "--accent": option.accent,
                  "--accent-hover": option.hover,
                  "--accent-soft": option.soft,
                  "--accent-border": option.border,
                  "--text-on-accent": option.textOnAccent,
                } as React.CSSProperties
              }
            >
              <div className={styles.cardTop}>
                <span className={styles.swatch} />
                <h2>{option.name}</h2>
              </div>

              <p className={styles.profile}>{option.profile}</p>

              <div className={styles.samplePanel}>
                <p className={styles.panelTitle}>Sample controls</p>
                <div className={styles.actionRow}>
                  <button type="button" className={styles.primaryButton}>
                    Primary Action
                  </button>
                  <button type="button" className={styles.ghostButton}>
                    Secondary
                  </button>
                </div>

                <div className={styles.metaRow}>
                  <span className={styles.tag}>Live hover</span>
                  <a href="#" className={styles.link}>
                    Accent link
                  </a>
                </div>
              </div>

              <ul className={styles.stats}>
                <li>
                  Accent on dark: <strong>{contrastOnBackground}:1</strong>
                </li>
                <li>
                  Button text ratio: <strong>{contrastButtonText}:1</strong>
                </li>
                <li>
                  Accent hex: <strong>{option.accent}</strong>
                </li>
              </ul>
            </article>
          );
        })}
      </section>
    </main>
  );
}
