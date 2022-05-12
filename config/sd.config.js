const themes = require('./themes.json')
require('./sd/transforms.js')
require('./sd/transformGroups.js')
require('./sd/parsers.js')

const themeCSS = themes.map((theme) => ({
  destination: `themes/${theme}.css`,
  format: 'css/variables',
  filter: (token) => {
    return token.attributes.category === theme
  },
}))

const globalCSS = {
  destination: 'globals.css',
  format: 'css/variables',
  filter: (token) => {
    // all non-theme tokens are considered globals
    return !themes.includes(token.attributes.category)
  },
}

module.exports = {
  source: ['config/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'custom/css',
      prefix: 'betterplace',
      format: 'css/variables',
      buildPath: 'build/css/',
      files: [...themeCSS, globalCSS],
      options: {
        // if we want to only include the theme specific variables we would need to set this to false
        outputReferences: true,
      },
    },
  },
}
