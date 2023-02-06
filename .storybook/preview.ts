import { withDesign } from 'storybook-addon-designs'
import { withThemeProvider } from '../src/helpers'
import AvailableThemes from '../src/lib/shared/themes.json'
import { GlobalTypes, Parameters } from '@storybook/types'

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
      // needs to be inline, see https://github.com/storybookjs/storybook/issues/20883
      order: [
        "Foundations",
        ["About the Design System", "Design Principles", "Experience Values"],
        "Guides",
        ["Content guide", "Accessibility guide", "UX Design guide", "Development guide", "Testing guide"],
        "Tokens",
        ["Introduction", "Colors", "Typography", "Spacing", "Grid", "Breakpoints"],
        "Elements",
        "Components",
        "Hooks"
      ],
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
