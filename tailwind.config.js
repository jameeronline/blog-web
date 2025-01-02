import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
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
        background: {
          body: "var(--bg-color-body)",
        },
        typography: {
          DEFAULT: "var(--text-color-default)",
          primary: "var(--text-color-primary)",
          secondary: "var(--text-color-secondary)",
          tertiary: "var(--text-color-tertiary)",
          quaternary: "var(--text-color-quaternary)",
        },
      },

      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
