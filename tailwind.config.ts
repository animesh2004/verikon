import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        muted: "var(--muted)",
        "muted-strong": "var(--muted-strong)",
        border: "var(--border)",
        accent: "var(--accent)",
        ink: {
          50: "#FAFAF9",
          100: "#F5F4F1",
          200: "#E7E5E2",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
          950: "#0C0A09",
        },
      },
      fontSize: {
        "display": ["var(--text-display)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "h1": ["var(--text-5xl)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "h2": ["var(--text-4xl)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "h3": ["var(--text-3xl)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};

export default config;
