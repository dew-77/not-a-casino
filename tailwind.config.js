/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tbank: {
          yellow: '#FFDD2D',
          black: '#333333',
          white: '#FFFFFF',
          gray: {
            50: '#F6F7F8',
            100: '#EDEDEE',
            200: '#E7E8EA',
            300: '#9299A2',
            400: '#6D7885',
            800: '#1F1F1F',
            900: '#0A0A0A',
          },
        },
      },
      boxShadow: {
        'tbank': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'tbank-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'tbank-xl': '0 16px 48px rgba(0, 0, 0, 0.16)',
      },
      borderRadius: {
        'tbank': '24px',
      },
    },
  },
  plugins: [],
}

