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

// TODO: output typography styles as mixin
StyleDictionary.registerTransform({
  name: 'value/typography',
  type: 'value',
  matcher: function (token) {
    return token.type === 'typography'
  },
  transformer: function (token) {
    console.log(token)
    return `{
      font-family: ${token.value.fontFamily};
      font-size: ${token.value.fontSize};
      font-weight: ${token.value.fontWeight};
      line-height: ${token.value.lineHeight};
      letter-spacing: ${token.value.letterSpacing};
      text-transform: ${token.value.textCase};
      text-decoration: ${token.value.textDecoration};
    }`
  },
})

StyleDictionary.registerParser({
  pattern: /\.json$/,
  parse: ({ contents }) => {
    // replace the old reference syntax with the one style-dictionary understands
    // e.g. "$fontFamilies.fira-sans" -> "{fontFamilies.fira-sans}"
    // see https://docs.tokens.studio/tokens/aliases
    const tokens = JSON.parse(contents.replace(/\$([^"]+)/g, `{$1}`))

    // strip away the global key for global token set but keep the themes nested
    // this is necessary, because the references from Figma Tokens do not include the token set key
    // e.g. {Primary.Green 800} would not work
    let transformedTokens = tokens['global']

    Object.keys(tokens).forEach((set) => {
      // only add the token set if it is defined as a valid theme
      if (themes.includes(set)) {
        transformedTokens[set] = tokens[set]
      }
    })

    return transformedTokens
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
        // 'value/typography',
      ],
      prefix: 'betterplace',
      buildPath: 'build/css/',
      files: [
        ...themes.map((theme) => ({
          destination: `themes/${theme}.css`,
          format: 'css/variables',
          options: {
            // if we want to only include the theme specific variables we would need to set this to false
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
          filter: (token) => {
            // all non-theme tokens are considered globals
            return !themes.includes(token.attributes.category)
          },
        },
      ],
    },
  },
}
