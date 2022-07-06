const twColors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "border-2",
    {
      pattern: /mantine-.*/
    }
  ],
  theme: {
    extend: {
      colors: {
        ...twColors
      },
      gridTemplateColumns: {
        "2-hugl": "min-content 1fr"
      }
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
