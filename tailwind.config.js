/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-pattern":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('/bg-login.png')",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        16: "repeat(auto-fit, minmax(300px, 1fr))",
        20: "15rem 1fr",
        21: "0rem 1fr",
      },
      transitionProperty: {
        "grid-row": "grid-template-rows",
      },
    },
  },
  plugins: [],
};
