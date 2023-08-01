/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'black-light': '#202020',
        'black-dark': '#060606',
        'black-main': '#080808',
        theme: 'var(--theme-color)',
        'theme-light': 'var(--theme-color-light)',
      },
      boxShadow: {
        'input-theme': '0 0 3px 0 var(--theme-color-light)',
        'input-error': '0 0 3px 0 #F4ACAC',
      },
      fontFamily: {
        rubik: "'Rubik', sans-serif",
        calistoga: "'Calistoga', cursive",
      },
    },
  },
  plugins: [],
}
