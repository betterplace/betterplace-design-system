import { ComponentInfo } from './fetch_components'
const boolLabels = ['true', 'false', 'on', 'off', 'yes', 'no']
const defLabel = 'default'
function stripBooleanValues(values: string[]): string[] {
  return values.filter((value) => !boolLabels.includes(value.toLowerCase()))
}

export default function generateComponentPropTypes({ props, name }: Pick<ComponentInfo, 'props' | 'name'>): string {
  let res = `export type ${name}Props = {`

  for (const key in props) {
    const { mandatory: mandatory_, values: values_, name } = props[key]
    const values = stripBooleanValues(values_)
    let bool = !values.length || values.length !== values_.length
    const simpleType = values.length === 1
    bool = bool && !simpleType
    const optional = !mandatory_ || bool
    res += `${name}${optional ? '?' : ''}: `
    let type = ''
    if (!simpleType) {
      type += values
        .filter((v) => v.toLowerCase() !== defLabel)
        .map((v) => `'${v}'`)
        .join(' | ')
    } else {
      type = 'any'
    }
    if (bool) {
      if (type) type += ' | '
      type += 'boolean'
    }
    res += `${type};`
  }
  return `${res}}\n`
}
