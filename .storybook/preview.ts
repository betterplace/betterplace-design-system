import { withDesign } from 'storybook-addon-designs'
import { withThemeProvider } from '../src/helpers'
import AvailableThemes from '../src/lib/shared/themes.json'
import { GlobalTypes, Parameters } from '@storybook/types'
import order from './order.json'

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
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

export const globalTypes: GlobalTypes = {
  theme: {
    name: 'Theme',
    description: 'Switch theme for preview',
    defaultValue: AvailableThemes[0].key,
    toolbar: {
      items: AvailableThemes.map((theme) => {
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
