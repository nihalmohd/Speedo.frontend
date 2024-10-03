/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        squada: ['Squada One', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

