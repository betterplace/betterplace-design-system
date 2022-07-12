import { create } from '@storybook/theming'

export default create({
  // see https://storybook.js.org/docs/react/configure/theming for a list of options
  base: 'light',
  brandTitle: 'Betterplace Design System',
  brandUrl: '/',
  brandImage: '/bp-logo.svg',
  brandTarget: '_self',

    // Text colors
  textColor: '#292929',

  // Typography
    fontBase: '"Fira Sans", sans-serif',

    colorPrimary: '#9ecb0a',
      colorSecondary: '#6d2c64',
})
