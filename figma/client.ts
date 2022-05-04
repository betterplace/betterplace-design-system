import * as Figma from 'figma-api'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
console.log(process.env.STORYBOOK_FIGMA_ACCESS_TOKEN)
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const personalAccessToken = process.env.STORYBOOK_FIGMA_ACCESS_TOKEN!
export default new Figma.Api({
  personalAccessToken,
})
