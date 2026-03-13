/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-red': '#8B0000',
        'dark-crimson': '#A0001C',
        'accent-gold': '#F4C542',
        'soft-gold': '#FFD166',
        'dark-overlay': '#1A0B0B',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
       animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'curtain-left': 'curtainLeft 1.5s ease-out forwards',
        'curtain-right': 'curtainRight 1.5s ease-out forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px #F4C542, 0 0 20px #F4C542' },
          '100%': { textShadow: '0 0 20px #F4C542, 0 0 40px #F4C542, 0 0 60px #FFD166' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        curtainLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        curtainRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 10px #F4C542, 0 0 20px #F4C54240' },
          '50%': { boxShadow: '0 0 20px #F4C542, 0 0 40px #F4C542, 0 0 60px #FFD166' },
        },
      },
    },
  },
  plugins: [],
}
