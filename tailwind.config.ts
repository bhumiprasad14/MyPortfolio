import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#030712",
        surface: {
          50: "#0b0f19",
          100: "#111726",
          200: "#172033",
          300: "#1f2b45",
          glass: "rgba(15, 23, 42, 0.65)"
        },
        lavender: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        cyber: {
          blue: "#c4b5fd",
          cyan: "#a78bfa",
          violet: "#8b5cf6",
          purple: "#7c3aed",
          neon: "#ddd6fe",
          emerald: "#fbbf24"
        }
      },
      fontFamily: {
        sans: ["Calibri", "Candara", "Segoe", "Segoe UI", "Optima", "Arial", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite"
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      boxShadow: {
        "glow-lavender": "0 0 25px -5px rgba(167, 139, 250, 0.4)",
        "glow-violet": "0 0 25px -5px rgba(139, 92, 246, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      }
    },
  },
  plugins: [],
};
export default config;
