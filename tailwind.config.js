/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pastel palette
        rose:    { 50: "#edf4f0", 100: "#d5e8de", 200: "#aad1bc", 300: "#7ab89b", 400: "#5ea07c", 500: "#4E8B6E", 600: "#3d6e57", 700: "#2c5240", 800: "#1b3629", 900: "#0a1a13" },
        peach:   { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c" },
        sage:    { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80" },
        lavender:{ 50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe" },
        cream:   { 50: "#fefce8", 100: "#fef9c3" },
        brand: {
          primary:   "#4E8B6E",
          secondary: "#5ea07c",
          accent:    "#7ab89b",
          light:     "#edf4f0",
          dark:      "#1b3629",
        },
      },
      fontFamily: {
        sans: ["var(--font-heebo)", "Heebo", "Arial", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 24px 0 rgba(78,139,110,0.08)",
        card: "0 2px 16px 0 rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
