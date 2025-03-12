/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-pattern': "url('./src/assets/pesas.webp')",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      /* colors: {
        escuela: "#039357",
        escuelaBajito: "#09ba70",
      }, */
    },
  },
  plugins: [],
};
