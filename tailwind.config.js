/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#ccfbe8',
          200: '#9df6d2',
          300: '#5eedb6',
          400: '#1df2a4', // cool luminous light emerald
          500: '#05e595', // vibrant light emerald
          600: '#00bd77',
          700: '#02945f',
          800: '#05744d',
          900: '#065f41',
          950: '#013623'
        }
      }
    }
  },
  plugins: []
};
