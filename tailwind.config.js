/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        14: "repeat(14, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
      },
    },
  },
  plugins: [],
};
