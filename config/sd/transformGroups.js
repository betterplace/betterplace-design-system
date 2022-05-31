const StyleDictionary = require('style-dictionary')

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: [
    ...StyleDictionary.transformGroup['web'],
    'name/theme',
    'name/tokenType',
    'size/pxToRem',
    'value/quote',
    'value/boxShadow',
  ],
})

StyleDictionary.registerTransformGroup({
  name: 'custom/json',
  transforms: [
    ...StyleDictionary.transformGroup['js'],
    'name/cti/kebab',
    'name/theme',
    'name/tokenType',
    'size/pxToRem',
    'value/boxShadow',
  ],
})
