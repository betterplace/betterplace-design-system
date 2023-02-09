import { mergeConfig } from 'vite'
import baseConfig from './vite.base.config'
import dts from 'vite-plugin-dts'

export default mergeConfig(baseConfig, {
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ],
})