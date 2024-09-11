/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      colors: {
          red: {
            100: "#FFFAFA",
            200: "#FFBFBF",
            300: "#FF5353",
          },
          white: {
              100: "#FFFFFF",
              200: "#F4F4F4",
              300: "#DFDFDF",
          },
          black: {
              100: "#6B6B6B",
              200: "#626262",
              300: "#000000",
          },
      },

      fontSize: {
          sm: "16px",
          base: "18px",
          lg: "20px",
          xl: "24px",
          "2xl": "28px",
          "3xl": "32px",
          "4xl": "40px",
          "5xl": "50px",
      },

      extend: {
          fontFamily: {
              assistant: ['"Assistant"', "sans-serif"],
          },
          lineClamp: {
              '10': '10',
          }
      },
  },
  plugins: [],
};
