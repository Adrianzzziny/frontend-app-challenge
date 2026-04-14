/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        kambista: {
          cyan: '#14E2B1',
          cyanLight: '#c3eadd',
          text: '#011B33',
        }
      }
    },
  },
  plugins: [],
}