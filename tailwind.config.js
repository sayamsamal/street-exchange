/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulseRed: {
          "0%, 100%": { color: "white" },
          "50%": { color: "red" },
        },
        pulseGreen: {
          "0%, 100%": { color: "white" },
          "50%": { color: "green" },
        },
      },
      animation: {
        pulseRed: "pulseRed 1s linear",
        pulseGreen: "pulseGreen 1s linear",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
