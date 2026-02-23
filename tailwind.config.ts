import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
