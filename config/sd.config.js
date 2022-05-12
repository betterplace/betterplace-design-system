const themes = require('./themes.json')
require('./sd/transforms.js')
require('./sd/transformGroups.js')
require('./sd/parsers.js')

const getFileConfig = (platform, format) => {
  const themeFiles = themes.map((theme) => ({
    destination: `themes/${theme}.${platform}`,
    format: format,
    filter: (token) => {
      return token.attributes.category === theme
    },
  }))

  const globalFile = {
    destination: `globals.${platform}`,
    format: format,
    filter: (token) => {
      // all non-theme tokens are considered globals
      return !themes.includes(token.attributes.category)
    },
  }

  return [...themeFiles, globalFile]
}

module.exports = {
  source: ['config/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'custom/css',
      prefix: 'betterplace',
      buildPath: 'build/css/',
      files: getFileConfig('css', 'css/variables'),
      options: {
        // if we want to only include the theme specific variables we would need to set this to false
        outputReferences: true,
      },
    },
    json: {
      transformGroup: 'custom/json',
      prefix: 'betterplace',
      buildPath: 'build/json/',
      files: getFileConfig('json', 'json/flat'),
      options: {
        outputReferences: true,
      },
    },
  },
}
