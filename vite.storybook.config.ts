import { mergeConfig, defineConfig, loadEnv } from 'vite'
import baseConfig from './vite.base.config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return mergeConfig(baseConfig, {
    base: env.BASE_URL || '/'
  })
})