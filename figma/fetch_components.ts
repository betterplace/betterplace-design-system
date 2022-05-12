import fetchComponents, { Output } from './lib/fetch_components'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import getPropTypes from './lib/generate_component_prop_types'
function generateAllTypes(data: Output): string {
  let res = ''
  for (const key in data) {
    const component = data[key]
    res += getPropTypes(component)
  }
  return res
}
fetchComponents(process.argv[2]).then((data) => {
  writeFileSync(join(__dirname, '../config/components.json'), JSON.stringify(data))
  writeFileSync(join(__dirname, '../src/types.ts'), generateAllTypes(data.data))
})
