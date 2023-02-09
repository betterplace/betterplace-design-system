import { StorybookConfig } from '@storybook/react-vite'
import { PluginOption } from 'vite'

function isDtsPlugin(option: PluginOption) {
  return !!option && 'name' in option && option.name === 'vite:dts'
}
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
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    console.log('env', process.env.BASE_URL, process.env.STORYBOOK_FIGMA_ACCESS_TOKEN)
    config.base = process.env.BASE_URL || config.base
    config.plugins?.splice(config.plugins.findIndex(isDtsPlugin), 1)
    // return the customized config
    return config
  },
  docs: {
    autodocs: true,
  },
}
export default config
