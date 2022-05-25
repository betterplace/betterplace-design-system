import { withDesign } from 'storybook-addon-designs'
import { withThemeProvider } from '../src/helpers'
import AVAILABLE_THEMES from '../src/lib/shared/themes'
import order from './order.json'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order,
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Switch theme for preview',
    defaultValue: AVAILABLE_THEMES[0].key,
    toolbar: {
      items: AVAILABLE_THEMES.map((theme) => {
        return {
          value: theme.key,
          title: theme.title,
          right: theme.key,
        }
      }),
      dynamicTitle: true, // https://github.com/storybookjs/storybook/issues/17790
      showName: true,
    },
  },
}

export const decorators = [withDesign, withThemeProvider]
