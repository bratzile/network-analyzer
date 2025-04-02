/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          400: '#E6007E',
          500: '#D1006F',
          600: '#BC0060'
        }
      }
    },
  },
  plugins: [],
}