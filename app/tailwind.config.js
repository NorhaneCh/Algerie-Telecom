/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        primary: "#8fb3ff",
        secondary: "#ebf1ff",
        "gray-color" : "565656",
        "light-green" : "#F0FDFA",
        "light-gray" : "#D9D9D9",
        "light-blue" : "rgba(143, 179, 255, 0.2)",
        accent: "#00CC99",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #000",
      },
      screens: {
        xs: "450px",
        lg:"1280px",
        xl :"1920px",
      },
    },
  },
  plugins: [],
};