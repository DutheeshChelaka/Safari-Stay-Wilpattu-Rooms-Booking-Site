/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A2E",
        secondary: "#E94560",
        accent: "#F7D716",
        background: "#FAFAFA",
        text: "#222222",
      },
    },
  },
  plugins: [],
};
