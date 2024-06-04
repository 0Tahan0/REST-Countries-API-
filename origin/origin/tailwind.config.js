/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        dark: "var(--dark)",
        light: "var(--light)",
        dark2: "var(--dark2)",
        light2: "var(--light2)",
        lightText: "var(--lightTextColor)",
        lightInput: "var(--lightInputColor)",
      },
    },
  },
  plugins: [],
};
