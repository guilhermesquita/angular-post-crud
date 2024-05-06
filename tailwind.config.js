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
        'grayText': '#959090',
        'secondaryWhite': '#F2F2F2',
        'delete': '#EB2727'
      },
      borderRadius:{
        'radius': '7px',
      }
    },
  },
  plugins: [],
}

