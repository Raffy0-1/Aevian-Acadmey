import type { Metadata } from "next";
import { Newsreader, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Display: Newsreader — a serif built for long reading, giving the page an
// academic, unhurried gravitas without leaning on the high-contrast
// Didone-style serif that's become a template signal.
const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

// Body: Public Sans — a clean, highly legible grotesk with a civic,
// no-nonsense character that keeps long dashboard copy comfortable.
const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

// Utility: IBM Plex Mono — for course codes, timestamps, and data.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aevian.com"),
  title: {
    default: "Aevian — Learning built to last",
    template: "%s · Aevian",
  },
  description:
    "Aevian is a live online academy connecting students with expert teachers across the world, built around curricula designed to compound — not expire.",
  openGraph: {
    title: "Aevian — Learning built to last",
    description:
      "Live online classes, real teachers, curricula designed to compound.",
    siteName: "Aevian",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aevian — Learning built to last",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
