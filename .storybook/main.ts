import { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [{ directory: '../src', files: '**/*.stories.@(mdx|tsx|ts|jsx|js)' }],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/addon-a11y',
    'storybook-addon-designs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.storybook.config.ts',
      }
    }
  },
  docs: {
    autodocs: true,
  },
}
export default config
