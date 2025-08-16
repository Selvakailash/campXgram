/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#374151',
        }
      },
      animation: {
        bounce: 'bounce 1s infinite',
      }
    },
  },
  plugins: [],
}
