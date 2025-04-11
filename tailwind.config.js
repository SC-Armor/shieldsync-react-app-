/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        pulseGlow: "pulseGlow 2s ease-in-out infinite"
      },
      keyframes: {
        pulseGlow: {
          "0%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(1.15)" },
          "100%": { opacity: "0.7", transform: "scale(1)" }
        }
      }
    }
  },
  plugins: []
}
