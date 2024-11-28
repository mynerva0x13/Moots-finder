/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ejs,ts,tsx}"],
  theme: {
    extend: {},
  },  plugins: [
    require('tailwindcss-animated')
  ],
}