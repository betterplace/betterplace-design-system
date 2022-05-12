const StyleDictionary = require('style-dictionary')

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: [
    ...StyleDictionary.transformGroup['web'],
    'name/theme',
    'size/pxToRem',
    'value/quote',
    'value/boxShadow',
    'value/typography',
  ],
})

StyleDictionary.registerTransformGroup({
  name: 'custom/json',
  transforms: [
    ...StyleDictionary.transformGroup['js'],
    'name/cti/kebab',
    'name/theme',
    'size/pxToRem',
    'value/boxShadow',
  ],
})
