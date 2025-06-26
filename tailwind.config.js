export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          // add all grays you use explicitly here with hex
        },
        black: "#000000",
        white: "#ffffff",
        // etc.
      },
    },
  },
  plugins: [],
};
