import Figma from 'figma-api'
import DotEnv from 'dotenv'

DotEnv.config()
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const personalAccessToken = process.env.FIGMA_API_TOKEN!
export default new Figma.Api({
  personalAccessToken,
})
