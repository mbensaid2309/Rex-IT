/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgb(55 65 81)',
            h1: { color: 'rgb(17 24 39)' },
            h2: { color: 'rgb(17 24 39)' },
            h3: { color: 'rgb(17 24 39)' },
            h4: { color: 'rgb(17 24 39)' },
            strong: { color: 'rgb(17 24 39)' },
            code: { color: 'rgb(239 68 68)' },
            blockquote: { color: 'rgb(75 85 99)' },
          },
        },
        invert: {
          css: {
            color: 'rgb(209 213 219)',
            h1: { color: 'rgb(255 255 255)' },
            h2: { color: 'rgb(255 255 255)' },
            h3: { color: 'rgb(255 255 255)' },
            h4: { color: 'rgb(255 255 255)' },
            strong: { color: 'rgb(255 255 255)' },
            code: { color: 'rgb(96 165 250)' },
            blockquote: { color: 'rgb(156 163 175)' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};