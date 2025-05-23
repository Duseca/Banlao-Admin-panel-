/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          150: '#F27C84',
          250: '#8E69FB',
        },
        gray: {
          150: '#F9633B',
          250: '#A1422A',
          350: '#5C2518',
          // 250: "#01040D",
          // 350: "#2C3333"
        },
      },
    },
  },
  plugins: [],
};
