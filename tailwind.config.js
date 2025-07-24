/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",   // Include all files inside the `app` directory
    "./components/**/*.{js,jsx,ts,tsx}", // Include all files inside the `components` directory
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
