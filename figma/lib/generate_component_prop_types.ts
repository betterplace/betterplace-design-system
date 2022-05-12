import { ComponentInfo } from './fetch_components'
const boolLabels = ['true', 'false', 'on', 'off', 'yes', 'no']
const defLabel = 'default'
function stripBooleanValues(values: string[]): string[] {
  return values.filter((value) => !boolLabels.includes(value.toLowerCase()))
}

export default function generateComponentPropTypes({ props, name }: ComponentInfo): string {
  if (!Object.keys(props).length) return ''
  let res = `export type ${name}Props = {`

  for (const key in props) {
    const { mandatory: mandatory_, values: values_, name } = props[key]
    const values = stripBooleanValues(values_)
    const bool = !values.length || values.length !== values_.length
    const simpleType = values.length === 1
    const optional = !mandatory_ || bool
    res += `${name}${optional ? '?' : ''}: `
    let type = ''
    if (!simpleType) {
      type += values
        .filter((v) => v.toLowerCase() !== defLabel)
        .map((v) => `'${v}'`)
        .join(' | ')
    } else {
      type += 'string'
    }
    if (bool) {
      if (type) type += ' | '
      type += 'boolean'
    }
    res += `${type};`
  }
  return `${res}}\n`
}
