/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-color": "#191c1a",
        "btn-primary": "#0071e3",
      },
      gridTemplateRows: {
        grid1remauto1rem: "4rem 1fr 2rem",
        gridauto1fr: "auto 1fr",
      },
    },
  },
  plugins: [],
};
