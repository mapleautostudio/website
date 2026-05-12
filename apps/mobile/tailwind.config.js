/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        surface: "#0B0B0D",
        elevated: "#15151A",
        accent: "#D4A574",
        sage: "#9AA9A0",
      },
    },
  },
  plugins: [],
};
