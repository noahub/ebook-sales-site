/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "heading-gradient":
          "linear-gradient(145deg, rgba(182,15,219,1) 0%, rgba(150,190,210,1) 39%, rgba(94,107,198,1) 76%)",
      },
    },
  },
  plugins: [],
};
