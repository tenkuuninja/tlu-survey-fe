/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const { lightBlue } = require('@mui/material/colors')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '3rem',
      },
    },
    extend: {
      colors: {
        primary: lightBlue,
      },
      font: {
        nunito: 'Nunito',
        public: 'Public Sans',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
