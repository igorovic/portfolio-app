/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
