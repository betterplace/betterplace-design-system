module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/addon-a11y', // TODO: vite fix https://github.com/storybookjs/storybook/pull/17997
    'storybook-addon-designs',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, { configType }) {
    console.log('env', process.env.BASE_URL, process.env.STORYBOOK_FIGMA_ACCESS_TOKEN)
    config.base = process.env.BASE_URL || config.base

    // return the customized config
    return config
  },
}
