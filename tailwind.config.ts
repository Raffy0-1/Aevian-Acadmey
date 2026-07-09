import type { Config } from "tailwindcss";

// AEVIAN DESIGN SYSTEM
// -----------------------------------------------------------------------------
// Palette (named, 6 core tokens — see README.md for full rationale):
//   ink       #12181F  deep charcoal-navy — dark mode ground, hero backdrop
//   chalk     #F3F4F0  pale grey-green (cool, not cream) — light mode ground
//   meridian  #1F3D46  deep teal-indigo — primary brand color
//   gold      #B8925A  antique gold — accent, used sparingly (the "signature" color)
//   slate     #5B6570  muted neutral — secondary text, borders
//   + semantic: success / warning / danger / info
// All colors are exposed as CSS custom properties in globals.css so light/dark
// mode can swap values without duplicating the token map.
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        ink: "var(--ink)",
        chalk: "var(--chalk)",
        meridian: {
          DEFAULT: "var(--meridian)",
          foreground: "var(--meridian-foreground)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          foreground: "var(--gold-foreground)",
        },
        slate: "var(--slate)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        info: "var(--info)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.625rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
