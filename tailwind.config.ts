import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "sidebar-open": "calc(100% - 150px)",
        "sidebar-closed": "calc(100% - 20px)",
      },
      keyframes: {
        blink: {
          "0%": { opacity: "1" },
          "50%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        blink: "blink 2s infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "maruburi-extra-light": ["MaruBuri-ExtraLight", "sans-serif"],
        "maruburi-light": ["MaruBuri-Light", "sans-serif"],
        "maruburi-regular": ["MaruBuri-Regular", "sans-serif"],
        "maruburi-semi-bold": ["MaruBuri-SemiBold", "sans-serif"],
        "maruburi-bold": ["MaruBuri-Bold", "sans-serif"],
        "godo-b": ["GodoB", "sans-serif"],
        "godo-m": ["GodoM", "sans-serif"],
        nanum: ["NanumSquareNeo", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
  ],
};
export default config;
