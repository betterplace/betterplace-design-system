const StyleDictionary = require('style-dictionary')
const themes = require('../themes.json')

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
