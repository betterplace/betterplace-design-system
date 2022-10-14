import { StorybookConfig, Options } from '@storybook/core-common'
import { UserConfig } from 'vite'

interface ExtendedConfig extends StorybookConfig {
  viteFinal?: (config: UserConfig, options: Options) => Promise<UserConfig>
}
const config: ExtendedConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/addon-a11y',
    'storybook-addon-designs',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(config) {
    console.log('env', process.env.BASE_URL, process.env.STORYBOOK_FIGMA_ACCESS_TOKEN)
    config.base = process.env.BASE_URL || config.base
    // return the customized config
    return config
  },
}

export default config
