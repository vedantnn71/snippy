const {
  gray,
  blue,
  red,
  green,
  grayDark,
  tomatoDark,
  redDark,
  crimsonDark,
  pinkDark,
  plumDark,
  violetDark,
  blueDark,
  skyDark,
  cyanDark,
  yellowDark,
  orangeDark,
  mintDark,
  greenDark,
} = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../apps/web/src/pages/**/*.{js,jsx,ts,tsx}",
    "../../apps/web/src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...gray,
        ...blue,
        ...red,
        ...green,
        dark: {
          ...grayDark,
          ...blueDark,
          ...redDark,
          ...pinkDark,
          ...crimsonDark,
          ...plumDark,
          ...violetDark,
          ...skyDark,
          ...cyanDark,
          ...yellowDark,
          ...orangeDark,
          ...greenDark,
          ...mintDark,
          ...tomatoDark,

        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-radix')({
      variantPrefix: 'rdx',
    }),
  ],
};
