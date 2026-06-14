import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/providers/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/providers/ThemeProvider";

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-jb",
});

const SITE_URL = "https://swotlabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SwotLabs AGI Limited | Enterprise AI Services",
  description:
    "SwotLabs AGI Limited is an Ireland-based AI services company delivering transformative intelligence solutions to enterprise clients across the UK & Europe.",
  keywords: [
    "AI services",
    "enterprise AI",
    "machine learning",
    "generative AI",
    "MLOps",
    "AI consulting",
    "Ireland",
  ],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: SITE_URL,
    siteName: "SwotLabs AGI Limited",
    title: "SwotLabs AGI Limited | Enterprise AI Services",
    description:
      "Ireland-based AI services company delivering transformative intelligence solutions to enterprise clients across the UK & Europe.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwotLabs AGI Limited | Enterprise AI Services",
    description:
      "Ireland-based AI services company delivering transformative intelligence solutions to enterprise clients across the UK & Europe.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply saved accent before first paint to avoid a color flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <ThemeProvider>
            <ScrollProgress />
            <CustomCursor />
            <div className="grain-overlay" />
            {children}
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
