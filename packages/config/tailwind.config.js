/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../apps/web/src/pages/**/*.{js,jsx,ts,tsx}",
    "../../apps/web/src/components/**/*.{js,jsx,ts,tsx}",
    "../../packages/primitives/src/*.{js,jsx,ts,tsx}",
    "../../packages/primitives/index.ts",
  ],
  theme: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        primary: '0px 4px 74px 8px rgba(255, 165, 234, 0.05)'
      },
      colors: {
        'slate-border': '#1A1D1E',
      }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-radix')({
      variantPrefix: 'rdx',
    }),
    require('windy-radix-palette'),    
  ],
};
