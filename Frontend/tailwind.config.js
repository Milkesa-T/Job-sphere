/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Blue primary color as requested
        primaryDark: "#1E40AF",
        background: "#F3F4F6",
      },
    },
  },
  plugins: [],
};
