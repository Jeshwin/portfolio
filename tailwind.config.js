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
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "base-100":     "#eff1f5", // base
          "base-200":     "#e6e9ef", // mantle
          "base-300":     "#dce0e8", // crust
          "base-content": "#4c4f69", // text
          "neutral":      "#dc8a78", // rosewater
          "primary":      "#179299", // teal
          "secondary":    "#8839ef", // mauve
          "accent":       "#e64553", // maroon
          "info":         "#04a5e5", // sky
          "success":      "#40a02b", // green
          "warning":      "#df8e1d", // yellow
          "error":        "#d20f39", // red
        },
      },
      {
        dark: {
          "base-100":     "#303446", // base
          "base-200":     "#292c3c", // mantle
          "base-300":     "#232634", // crust
          "base-content": "#c6d0f5", // text
          "neutral":      "#f2d5cf", // rosewater
          "primary":      "#81c8be", // teal
          "secondary":    "#ca9ee6", // mauve
          "accent":       "#ea999c", // maroon
          "info":         "#99d1db", // sky
          "success":      "#a6d189", // green
          "warning":      "#e5c890", // yellow
          "error":        "#e78284", // red
        }
      },
    ],
  },
}
