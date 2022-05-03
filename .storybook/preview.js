import { withDesign } from 'storybook-addon-designs'
import { withThemeProvider, AVAILABLE_THEMES } from '../src/helpers/ThemeProvider'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const themeKeys = Object.keys(AVAILABLE_THEMES)

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Switch theme for preview',
    defaultValue: themeKeys[0],
    toolbar: {
      items: themeKeys.map((key) => {
        return { value: key, title: AVAILABLE_THEMES[key] }
      }),
      showName: true,
    },
  },
}

export const decorators = [withDesign, withThemeProvider]
