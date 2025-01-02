import colors from "tailwindcss/colors";
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
      colors: {
        primary: colors.purple,
        secondary: colors.emerald,
        tertiary: colors.teal,
        typography: {
          DEFAULT: "#1A1A1A",
          primary: "#1A1A1A",
          secondary: "#667085",
          tertiary: "#828282",
          quaternary: "#BDBDBD",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
