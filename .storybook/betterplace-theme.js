import { create } from '@storybook/theming'

export default create({
  // see https://storybook.js.org/docs/react/configure/theming for a list of options
  base: 'light',
  brandTitle: 'Betterplace Design System',
  brandUrl: '/',
  brandImage: '/bp-logo.svg',
  brandTarget: '_self',

  textColor: '#292929',
  fontBase: '"Fira Sans", sans-serif',
  textSize: '20rem'

  colorPrimary: '#9ecb0a',
  colorSecondary: '#6d2c64',

  appBorderRadius: 4,

  // Toolbar default and active colors
  barTextColor: '#292929',
  barSelectedColor: 'black',
  barBg: '#9ecb0a',
})
