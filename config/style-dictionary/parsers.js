import StyleDictionary from 'style-dictionary'
import themes from '../themes.json'

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
    let transformedTokens = tokens['global'] || {}

    Object.keys(tokens).forEach((set) => {
      // only add the token set if it is defined as a valid theme
      if (themes.includes(set)) {
        transformedTokens[set] = tokens[set]
      }
    })

    return transformedTokens
  },
})
