/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // SWOO Brand Colors - COR 3
      white: '#FFFFFF',
      yellow: {
        300: '#FFF9E6',
        400: '#FFD300',
        500: '#E6B800',
      },
      gray: {
        50: '#F5F6F7',
        100: '#E8E9EC',
        200: '#D1D5DB',
        300: '#B3B9C1',
        600: '#757B81',
        700: '#4B5563',
        800: '#262B32',
        900: '#090C11',
      },
      black: '#090C11',
      // Semantic colors
      green: {
        500: '#10B981',
        600: '#059669',
      },
      red: {
        500: '#FF6B6B',
        600: '#EF4444',
      },
      blue: {
        500: '#3B82F6',
      },
      amber: {
        500: '#F59E0B',
      },
    },
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
    },
    fontSize: {
      xs: ['12px', '1.25'],
      sm: ['14px', '1.5'],
      base: ['16px', '1.5'],
      lg: ['18px', '1.75'],
      xl: ['20px', '1.75'],
      '2xl': ['24px', '2'],
      '3xl': ['30px', '2.25'],
      '4xl': ['36px', '2.5'],
    },
    spacing: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      8: '32px',
      10: '40px',
      12: '48px',
      16: '64px',
      20: '80px',
      24: '96px',
      safe: '16px',
    },
    extend: {
      borderRadius: {
        lg: '8px',
      },
    },
  },
  plugins: [],
}
