const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    'src/pages/**/*.{js,ts,jsx,tsx}',
    'src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      '2xs': '280px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
