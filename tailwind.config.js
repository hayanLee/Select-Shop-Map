/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {},
      gridTemplateColumns: {
        main: 'minmax(100px, 400px) auto'
      }
    }
  },
  plugins: []
};
