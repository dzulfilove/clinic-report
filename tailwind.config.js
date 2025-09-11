/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <--- ini wajib
  ],
  theme: {
    extend: {
      colors: {
        primary: require("tailwindcss/colors").teal,
      },
    },
  },
  plugins: [],
};
