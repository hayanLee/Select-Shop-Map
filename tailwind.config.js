/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        active: '#75ADD0',
        main: '#9AC1E2',
        hover: '#BCD2E9',
        ligthPoint: '#E5E1EF',
        point: '#E0A8CD',
        input: '#F2F4F8'
      },
      gridTemplateColumns: {
        main: 'minmax(400px, 0.5fr) 2fr'
      }
    }
  },
  plugins: []
};
