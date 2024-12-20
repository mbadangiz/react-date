/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Black_ir: "IRANSans_Black",
        Bold_ir: "IRANSans_Bold",
        Medium_ir: "IRANSans_Medium",
        Light_ir: "IRANSans_Light",
        UltraLight_ir: "IRANSans_UltraLight",
        Reg_ir: "IRANSans_Reg",
      },
      colors: {
        light: {
          "gray-100": "#F5F5F5",
          "gray-200": "#DDDDDD",
          "gray-300": "#c4c4c4",
          "gray-400": "#888888",
          "primary-text": "#131A29",
        },
        bluePowder: "#1F5EFF",
      },
    },
  },
  plugins: [],
};
