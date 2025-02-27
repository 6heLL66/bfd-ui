import {heroui} from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0D0F12",
        surface: "#181A1E",
        border: "#26292E",
        primary: {
          default: "#6D77FF",
          hover: "#5760D8",
        },
        secondary: "#00D4A5",
        foreground: {
          primary: "#E1E2E5",
          secondary: "#A4A6AA",
        },
        danger: "#FF4F64",
        warning: "#F0A500",
        success: "#4CAF50",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["36px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
        h3: ["28px", { lineHeight: "1.4", fontWeight: "500" }],
        h3bold: ["28px", { lineHeight: "1.4", fontWeight: "700" }],
        body: ["20px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.5" }],
      },
      fontWeight: {
        bold: "700",
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
