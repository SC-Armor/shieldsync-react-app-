/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      zIndex: {
        300: "300",
        400: "400",
      },
      colors: {
        slateblue: "#0b1220",
        navyblue: "#10131c",
      },
      spacing: {
        "560": "560px",
      },
    },
  },
  plugins: [],
};
