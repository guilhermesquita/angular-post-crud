/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#141212',
        'mainWhite': '#ffffff',
        'gray': '#736F6F',
        'secondaryWhite': '#F2F2F2',
        'deleted': '#EB2727'
      },
    },
  },
  plugins: [],
}

