/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        calm: "0 24px 60px rgba(7, 11, 24, 0.28)",
      },
      colors: {
        ink: {
          950: "#07111d",
          900: "#0b1626",
        },
        mist: {
          50: "#eef5ff",
          100: "#dae7fb",
          200: "#b9cee9",
        },
        mint: {
          300: "#85decf",
        },
        sand: {
          300: "#dec197",
        },
      },
    },
  },
  plugins: [],
};
