/* eslint-disable */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/index.html', './src/**/*.ts'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
