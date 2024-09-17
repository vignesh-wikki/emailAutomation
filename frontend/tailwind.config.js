/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      borderWidth: {
        '2': '2px', 
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}