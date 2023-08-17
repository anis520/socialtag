/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "#00BFA6",
        primaryText: "#00BFA6",
        secondaryText: "#1f2937",
      },
    },
  },
  plugins: [],
};
