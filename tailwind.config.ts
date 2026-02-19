import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"]
      },
      colors: {
        background: "#050816",
        surface: "#111827",
        accent: {
          DEFAULT: "#e11d48",
          soft: "#f97373"
        }
      },
      boxShadow: {
        "soft-lg": "0 20px 40px rgba(0,0,0,0.45)"
      }
    }
  },
  plugins: []
};

export default config;

