/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        surface:  "#0B0B0D",
        elevated: "#15151A",
        text:     "#F5F2EC",
        accent:   "#D4A574",
        sage:     "#9AA9A0",
        fg1:      "rgba(245,242,236,0.85)",
        fg2:      "rgba(245,242,236,0.55)",
        fg3:      "rgba(245,242,236,0.35)",
        border:   "rgba(245,242,236,0.08)",
      },
    },
  },
  plugins: [],
};
