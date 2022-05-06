const StyleDictionary = require('style-dictionary')
const themes = ['at', 'me', 'org']

// remove the theme key from the alias name
StyleDictionary.registerTransform({
  name: 'name/theme',
  type: 'name',
  matcher: function (token) {
    return themes.includes(token.attributes.category)
  },
  transformer: function (token) {
    return token.name.replace(token.attributes.category + '-', '')
  },
})

// convert px values to rem values
StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  matcher: function (token) {
    return ['fontSizes', 'paragraphSpacing'].includes(token.type)
  },
  transformer: function (token) {
    return (parseInt(token.original.value) / 16).toString() + 'rem'
  },
})

// quote values
StyleDictionary.registerTransform({
  name: 'value/quote',
  type: 'value',
  matcher: function (token) {
    return ['fontFamilies'].includes(token.type)
  },
  transformer: function (token) {
    return `'${token.original.value}'`
  },
})

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'name/theme',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css',
        'size/pxToRem',
        'value/quote',
      ],
      prefix: 'betterplace',
      buildPath: 'build/css/',
      files: [
        ...themes.map((source) => ({
          destination: `themes/theme-${source}.css`,
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
          filter: {
            attributes: {
              category: source,
            },
          },
        })),
        {
          destination: 'globals.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
          filter: {
            attributes: {
              category: 'global',
            },
          },
        },
      ],
    },
  },
}
