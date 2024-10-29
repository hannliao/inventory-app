/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'Helvetica', 'Arial', 'sans-serif'],
      custom: ['josefin-sans', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
