/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include this to scan the root HTML file
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
