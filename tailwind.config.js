/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#082f49',
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          600: '#475569',
          900: '#0f172a',
        },
        success: {
          500: '#22c55e',
          600: '#16a34a',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
        },
        warning: {
          500: '#f97316',
          600: '#ea580c',
        },
      },
      spacing: {
        safe: '16px',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
      },
    },
  },
  plugins: [],
}
