/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6363",
        secondary: "#4C1D95",

        // Custom background colors
        bgPrimary: "#e8d79e",

        // Custom text colors
        textHead: "#130f40",
        textParagraph: "#30336b",

        // Custom border colors
        borderPrimary: "#e5e7eb",

        // Custom shadow colors
        shadowPrimary: "#0000001a",
      },
    },
  },
  plugins: [],
};
