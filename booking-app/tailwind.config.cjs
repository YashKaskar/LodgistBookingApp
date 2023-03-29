/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: { 
        lodgist: '#497737',
        lodgist1: '#F7EFE5'
      },
    },
  },
  plugins: [],
}
