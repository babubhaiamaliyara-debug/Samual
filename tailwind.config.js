/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grace': {
          50: '#faf8f3',
          100: '#f5f0e6',
          200: '#ebe3d0',
          300: '#ddd0b4',
          400: '#cbb882',
          500: '#b8a05a',
          600: '#a68a48',
          700: '#8b703c',
          800: '#6d5730',
          900: '#584627',
        },
        'holy': {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c1d7ff',
          300: '#a2c3ff',
          400: '#83afff',
          500: '#649bff',
          600: '#4582e6',
          700: '#3665b3',
          800: '#254880',
          900: '#182b4d',
        },
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
