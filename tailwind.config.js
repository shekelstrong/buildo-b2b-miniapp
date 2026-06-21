/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-surface": "var(--color-bg-surface)",
        "bg-border": "var(--color-bg-border)",
        ink: "var(--color-ink)",
        "ink-muted": "var(--color-ink-muted)",
        "ink-dim": "var(--color-ink-dim)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
      },
    },
  },
  plugins: [],
}
