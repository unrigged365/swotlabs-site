import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/providers/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "SwotLabs AGI Limited | Enterprise AI Services",
  description:
    "SwotLabs AGI Limited is an Ireland-based AI services company delivering transformative intelligence solutions to enterprise clients across the UK & Europe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <ThemeProvider>
            <CustomCursor />
            <div className="grain-overlay" />
            {children}
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}

