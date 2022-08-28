/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans-serif': ['Montserrat'],
      },
      colors: {
        heading: '#FA2FB5',
      },
    },
  },
  plugins: [],
};
