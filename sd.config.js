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

// shadows
StyleDictionary.registerTransform({
  name: 'value/boxShadow',
  type: 'value',
  matcher: function (token) {
    return token.type === 'boxShadow'
  },
  transformer: function (token) {
    return `${token.original.value.x}px ${token.original.value.y}px ${token.original.value.blur}px ${token.original.value.spread}px ${token.original.value.color}`
  },
})

// typography
StyleDictionary.registerTransform({
  name: 'value/typography',
  type: 'value',
  matcher: function (token) {
    return token.type === 'typography'
  },
  transformer: function (token) {
    // TODO: add mixin instead of single tokens
    return null
  },
})

module.exports = {
  source: ['config/tokens.json'],
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'name/theme',
        'time/seconds',
        'content/icon',
        'color/css',
        'size/pxToRem',
        'value/quote',
        'value/boxShadow',
        'value/typography',
      ],
      prefix: 'betterplace',
      buildPath: 'build/css/',
      files: [
        ...themes.map((theme) => ({
          destination: `themes/${theme}.css`,
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
          filter: {
            attributes: {
              category: theme,
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
  parsers: [
    {
      pattern: /\.json$/,
      parse: ({ contents }) => {
        const tokens = JSON.parse(contents)

        Object.keys(tokens).forEach((category) => {
          categoryContents = JSON.stringify(tokens[category])
          // TODO: how do we know which category the reference belongs to?
          // categoryContents = categoryContents.replace(/"\$([^"]+)"/g, `"{${category}.$1.value}"`)
          categoryContents = categoryContents.replace(/"\$([^"]+)"/g, `"{global.$1.value}"`)
          tokens[category] = JSON.parse(categoryContents)
        })

        return tokens
      },
    },
  ],
}
