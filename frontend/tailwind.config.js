// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        // FIX: Use 'var(--brand-1)' directly, and let Tailwind apply the HSL wrapper.
        // Tailwind handles HSL/RGB/etc. if the CSS variable is defined as: H, S, L
        primary: 'hsl(var(--brand-1) / <alpha-value>)',
        cyan: 'hsl(var(--brand-2) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}