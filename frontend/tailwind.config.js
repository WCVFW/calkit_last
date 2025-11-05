// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--brand-1) / <alpha-value>)',
        cyan: 'hsl(var(--brand-2) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif'],
        libre: ['"Libre Bodoni"', 'serif'], 
      },
    },
  },
  plugins: [],
};
