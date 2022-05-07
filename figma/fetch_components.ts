import fetchComponents from './lib/fetch_components'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
fetchComponents(process.argv[2]).then((data) =>
  writeFileSync(join(__dirname, '../config/components.json'), JSON.stringify(data))
)
