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
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(155, 135, 245, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(155, 135, 245, 0.6)",
          },
        },
        "processing": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scan": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
        "processing": "processing 1.5s linear infinite",
        "scan": "scan 2s linear infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
