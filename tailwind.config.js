/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Helvetica', 'Open Sans', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          "base-100":  "#F2F2FF",
          "neutral":   "#4C4C56",
          "primary":   "#2E4594",
          "secondary": "#5073AD",
          "accent":    "#247F6F",
          "info":      "#2952AC",
          "success":   "#0C5F3F",
          "warning":   "#8B6F00",
          "error":     "#731E1E",
        },
      },
      {
        dark: {
          "base-100":  "#22222E",
          "neutral":   "#262633",
          "primary":   "#CF72D8",
          "secondary": "#FC759B",
          "accent":    "#F08A5D",
          "info":      "#6EF8F7",
          "success":   "#6EF898",
          "warning":   "#F9ED69",
          "error":     "#FF6868",
        }
      },
    ],
  },
}
