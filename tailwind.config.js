/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgColor: 'hsl(var(--color-background) / <alpha-value>)',
        fgColor: 'hsl(var(--color-foreground) / <alpha-value>)',
        likeColor: 'hsl(var(--color-like) / <alpha-value>)',
        commentColor: 'hsl(var(--color-comment) / <alpha-value>)',
        saveColor: 'hsl(var(--color-save) / <alpha-value>)',
        errColor: 'hsl(var(--color-error) / <alpha-value>)',
      },
      fontFamily: {
        sans: ["'Open Sans'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
