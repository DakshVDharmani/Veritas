/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: '#0E1411', // Background
          800: '#141C17', // Primary Surface
          700: '#1B261F', // Secondary Surface
          divider: '#223029',
        },
        accent: {
          DEFAULT: '#6FAF8A',
          hover: '#5A9675',
        },
        warning: '#C8A24A',
        text: {
          primary: '#E6ECE8',
          muted: '#9FB0A6',
        }
      },
      fontFamily: {
        serif: ['"IBM Plex Serif"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        'institutional': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [],
}
