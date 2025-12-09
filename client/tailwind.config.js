/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cinematic-bg': '#0A0A0A',
        'cinematic-border': '#1F1F1F',
        'rating-yellow': '#F5C518',
        'like-red': '#E04F5F',
        'watchlist-green': '#00B87B',
        'icon-fade': 'rgba(255, 255, 255, 0.5)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // We will ensuring Inter is available later or rely on system fonts for now
      },
    },
  },
  plugins: [],
}
