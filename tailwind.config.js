/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(17 17 17 / <alpha-value>)",
        surface: "rgb(31 31 31 / <alpha-value>)",
        neon: {
          blue: "rgb(99 102 241 / <alpha-value>)",
          cyan: "rgb(34 211 238 / <alpha-value>)",
          purple: "rgb(168 85 247 / <alpha-value>)",
          pink: "rgb(236 72 153 / <alpha-value>)",
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
