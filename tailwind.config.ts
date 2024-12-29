import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        plant: {
          free: "#F2FCE2",
          pro: "#a2d96e",
          "pro-dark": "#8bc952",
          premium: "#9b87f5",
          "premium-accent": "#7E69AB",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        "accordion-up": {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(5deg)" },
        },
        "glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(162, 217, 110, 0.3), 0 0 40px rgba(255, 215, 0, 0.2), 0 0 60px rgba(100, 149, 237, 0.1)",
            borderColor: "rgba(162, 217, 110, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(162, 217, 110, 0.6), 0 0 50px rgba(255, 215, 0, 0.4), 0 0 70px rgba(100, 149, 237, 0.2)",
            borderColor: "rgba(162, 217, 110, 0.8)",
          },
        },
        "processing": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scan": {
          "0%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { opacity: "0.8" },
          "100%": { transform: "translateY(100%)", opacity: "0.6" }
        },
        "vein-flow": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "50%": { opacity: "0.5", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" }
        },
        "particle-float": {
          "0%": { transform: "translate(0, 0) rotate(0deg)", opacity: "0" },
          "50%": { opacity: "0.8" },
          "100%": { transform: "translate(var(--tx), var(--ty)) rotate(360deg)", opacity: "0" }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
        "processing": "processing 1.5s linear infinite",
        "scan": "scan 2s linear infinite",
        "vein-flow": "vein-flow 3s ease-in-out infinite",
        "particle-float": "particle-float 4s ease-out forwards"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;