/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'accent-blue': {
          900: 'var(--color-accent-blue-900)',
          700: 'var(--color-accent-blue-700)',
          500: 'var(--color-accent-blue-500)',
          300: 'var(--color-accent-blue-300)',
          100: 'var(--color-accent-blue-100)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
