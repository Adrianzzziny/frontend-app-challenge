/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}" 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat_400Regular', 'sans-serif'],
        medium: ['Montserrat_500Medium', 'sans-serif'],
        semibold: ['Montserrat_600SemiBold', 'sans-serif'],
        bold: ['Montserrat_700Bold', 'sans-serif'],
      },
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