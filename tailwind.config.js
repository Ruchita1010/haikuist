/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgColor: 'hsl(var(--color-background) / <alpha-value>)',
        fgColor: 'hsl(var(--color-foreground) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
