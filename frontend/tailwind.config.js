/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#2563eb',
          950: '#0f172a',
        },
        violet: {
          500: '#8b5cf6',
        },
        rose: {
          500: '#f43f5e',
        },
      },
    },
  },
  plugins: [],
}
