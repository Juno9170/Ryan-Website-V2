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
    },
  },
  plugins: [],
};
