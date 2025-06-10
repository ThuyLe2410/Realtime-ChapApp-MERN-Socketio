
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")], // Fixed: properly import daisyui
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro"]
  }
}