import type { Config } from "tailwindcss";

/**
 * The base spacing unit is ONE PIXEL.
 *   px-12 = 12px   py-20 = 20px   gap-60 = 60px   h-36 = 36px
 * Every spacing utility in this codebase is a literal pixel value.
 */
const pixelSpacing = (() => {
  const scale: Record<string, string> = { px: "1px", 0: "0px", full: "100%" };
  for (let step = 0.5; step <= 400; step += 0.5) {
    scale[String(step)] = `${step}px`;
  }
  return scale;
})();

/** clamp(min, min + (max - min) * slope, max) across a 375px → 1600px viewport. */
const fluid = (min: number, max: number) =>
  `clamp(${min}px, calc(${min}px + ${max - min} * var(--fluid-slope)), ${max}px)`;

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    spacing: pixelSpacing,
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      sm: "0",
      md: "0",
      lg: "0",
      xl: "0",
      full: "9999px", // reserved for the scrollbar thumb only
    },
    boxShadow: {
      none: "none",
    },
    extend: {
      screens: {
        sm: "40rem",
        md: "48rem",
        lg: "64rem",
        xl: "80rem",
        "2xl": "96rem",
      },
      colors: {
        /* The invertible pair — every component paints in these two. */
        "theme-bg": "rgb(var(--theme-bg) / <alpha-value>)",
        "theme-fg": "rgb(var(--theme-fg) / <alpha-value>)",

        /* The literal palette. Five values, no ramps. */
        ink: "var(--color-ink)",
        white: "var(--color-white)",
        grey: "var(--color-grey)",
        accent: "var(--color-accent)",

        /* shadcn compatibility — mapped onto the same four values. */
        border: "rgb(var(--theme-fg) / <alpha-value>)",
        input: "rgb(var(--theme-fg) / <alpha-value>)",
        ring: "var(--color-accent)",
        background: "rgb(var(--theme-bg) / <alpha-value>)",
        foreground: "rgb(var(--theme-fg) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--theme-fg) / <alpha-value>)",
          foreground: "rgb(var(--theme-bg) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "var(--color-grey)",
          foreground: "var(--color-ink)",
        },
        muted: {
          DEFAULT: "var(--color-grey)",
          foreground: "rgb(var(--theme-fg) / 0.65)",
        },
        destructive: {
          DEFAULT: "var(--color-ink)",
          foreground: "var(--color-white)",
        },
        popover: {
          DEFAULT: "rgb(var(--theme-bg) / <alpha-value>)",
          foreground: "rgb(var(--theme-fg) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--theme-bg) / <alpha-value>)",
          foreground: "rgb(var(--theme-fg) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        /* Editorial voice — used italic, for accent moments only. */
        serif: ["DM Serif Display", "Iowan Old Style", "Georgia", "serif"],
      },
      fontSize: {
        /* Named by role, not by size. All display sizes are fluid. */
        "caption-10": ["12px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "400" }],
        "caption-20": ["14px", { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "400" }],
        /* Body copy runs light and loose — the single biggest contributor to
           the page feeling unhurried rather than dense. */
        "body-10": ["16px", { lineHeight: "1.7", letterSpacing: "-0.02em", fontWeight: "350" }],
        "body-20": ["24px", { lineHeight: "1.45", letterSpacing: "-0.02em", fontWeight: "350" }],
        "body-30": [fluid(24, 32), { lineHeight: "1.35", letterSpacing: "-0.02em", fontWeight: "350" }],
        "headline-10": [fluid(24, 40), { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "450" }],
        "headline-20": [fluid(32, 48), { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "450" }],
        "headline-30": [fluid(40, 56), { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "450" }],
        "headline-40": [fluid(40, 100), { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "450" }],
        "headline-50": [fluid(52, 200), { lineHeight: "0.8", letterSpacing: "-0.04em", fontWeight: "450" }],
        "digit-10": ["80px", { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "450" }],
        "digit-20": [fluid(80, 120), { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "450" }],
        "digit-30": [fluid(80, 140), { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "450" }],
      },
      fontWeight: {
        book: "450",
      },
      transitionTimingFunction: {
        "ease-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
        "ease-in": "cubic-bezier(0.55, 0, 1, 0.45)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        DEFAULT: "150ms",
        200: "200ms",
        300: "300ms",
        450: "450ms",
        600: "600ms",
        800: "800ms",
      },
      maxWidth: {
        prose: "60ch",
      },
      keyframes: {
        "theme-sweep-ltr": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0)" },
        },
        "theme-sweep-rtl": {
          "0%": { clipPath: "inset(0 0 0 100%)" },
          "100%": { clipPath: "inset(0)" },
        },
        "logo-coin": {
          "0%": { transform: "translateZ(1px) rotateY(0deg)" },
          "100%": { transform: "translateZ(1px) rotateY(-360deg)" },
        },
        "cursor-blink": {
          "0%, 44%": { opacity: "1" },
          "56%, 100%": { opacity: "0" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "logo-coin": "logo-coin 20s linear infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
        "marquee-left": "marquee-left var(--marquee-duration, 42s) linear infinite",
        "accordion-down": "accordion-down 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
