/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
        "secondary-color": "#86868b",
      },

      gridTemplateRows: {
        grid1remauto1rem: "4rem 1fr 2rem",
        gridauto1fr: "auto 1fr",
        grifform: "6fr 4fr",
      },
      gridTemplateColumns: {
        grifform: "80fr 20fr",
        taksItemCol: "auto 1fr",
      },
    },
  },
  plugins: [],
};
