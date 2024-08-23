/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        Anderson: ["Anderson", "sans-serif"],
        AndersonLight: ["AndersonLight", "sans-serif"],
        AndersonBold: ["AndersonBold", "sans-serif"],
        AndersonBolder: ["AndersonBolder", "sans-serif"],
        AndersonBoldest: ["AndersonBoldest", "sans-serif"],
      },
      colors: {
        lightGreen: "#CCE1CE",
      },
      boxShadow: {
        "dark-short": "0 3px 10px rgba(0, 0, 0, 0.3)", // Adjust the values as needed
      },
    },
  },
  plugins: [],
};
