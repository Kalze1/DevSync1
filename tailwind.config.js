/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navbarBg: '#F0F4FA', // Your desired hex code
      },
    },
  },
  plugins: [require("daisyui")]
}