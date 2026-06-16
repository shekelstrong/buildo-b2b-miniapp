/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          700: '#0f2540',
          800: '#0a1a30',
          900: '#0a1628',
        },
        tide: {
          300: '#5fd8f0',
          400: '#12c2e8',
          500: '#0fa6c9',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        coral: {
          400: '#ff8585',
          500: '#ff6b6b',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
