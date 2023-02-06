import { Node, Style } from 'figma-api'
import Figma from './client'
import AVAILABLE_THEMES from '../../src/lib/shared/themes.json'
const ThemeKeys = AVAILABLE_THEMES.map(({ key }) => key)
import { getWalk, getFileTopLevelChildren, camelize, ExtractorFn, pipe, objToArr } from './helpers'

const BoolLabels = ['true', 'false', 'on', 'off', 'yes', 'no']
const DEFAULT_LABEL = 'default'
const TextLikeProp: PropData = { required: false, type: ['string', 'JSX.Element', 'null'], name: 'label' }
const KnownPropTypes: Props = {
  label: TextLikeProp,
  content: TextLikeProp,
  text: TextLikeProp,
  children: TextLikeProp,
  hint: TextLikeProp,
  placeholder: TextLikeProp,
}

const StyleNames: Record<string, string> = {
  fills: 'background',
  text: 'text',
  effect: 'shadow',
  grid: 'positioning',
}

type ComponentTokens = (typeof StyleNames)[keyof typeof StyleNames]

function stripBooleanValues(values?: string[]): string[] {
  if (!values) return []
  return values.filter((value) => !BoolLabels.includes(value.toLowerCase()))
}

const getComponent: ExtractorFn<Node<'COMPONENT'>, 'COMPONENT'> = (node: Node) => {
  if (node.type !== 'COMPONENT') return
  return [node.id, 'COMPONENT', node as Node<'COMPONENT'>] as const
}

const getFrame: ExtractorFn<Node<'FRAME'>, 'FRAME'> = (node: Node) => {
  if (node.type !== 'FRAME') return
  return [node.id, 'FRAME', node as Node<'FRAME'>] as const
}

const getComponentSet: ExtractorFn<Node<'COMPONENT_SET'>, 'COMPONENT_SET'> = (node: Node) => {
  if (node.type !== 'COMPONENT_SET') return
  return [node.id, 'COMPONENT_SET', node as Node<'COMPONENT_SET'>] as const
}

const extractors = [getComponent, getFrame, getComponentSet] as const

export function getComponentSpecUrl(
  { name: name_, id: fileId }: FileInfo,
  { id: id_, themes }: ComponentInfo,
  theme?: string
) {
  const name = name_.replace(/\s/gi, '-')
  const id = (theme && themes?.[theme]?.id) ?? id_
  return `${process.env.STORYBOOK_FIGMA_URL}/file/${fileId}/${name}?node-id=${encodeURIComponent(id)}`
}

export type PropType = 'string' | 'boolean' | 'number' | 'object' | 'array' | 'null' | 'JSX.Element'
export type PropTypes = Array<PropType>
export type PropData = {
  required: boolean
  name: string
  values?: string[]
  type?: PropTypes
  items?: PropData
  tokens?: ComponentTokens | undefined
}
export type Props = Record<string, PropData>
type RawComponentsType = {
  variants: Record<string, Pick<Node<'COMPONENT'>, 'name'>>
  theme?: string | undefined
}
export type ThemeData = Record<string, { id: string; theme: string }>

type MergedComponentType = Omit<RawComponentsType, 'theme'> & { themes?: ThemeData }

type ComponentsType = { states: string[]; props: Props; themes?: ThemeData }

type CommonComponentInfo = Pick<Node<'COMPONENT_SET'>, 'name' | 'id'> & {
  path: string
  canvasName: string
  frameId: string
  frameName: string
  tokens?: ComponentTokensMap | undefined
}

type RawOutput<Type extends {} = RawComponentsType> = Record<string, RawComponentInfo<Type>>

type RawComponentInfo<T extends {}> = CommonComponentInfo & T

export type ComponentTokensMap = Partial<Record<ComponentTokens, string>>

export type FileInfo = { name: string; id: string }

export type Output = RawOutput<ComponentsType>
export type ComponentInfo = RawComponentInfo<ComponentsType>

const StateValues: Record<string, string> = {
  focused: 'focus',
  pressed: 'active',
  disable: 'disabled',
  disabled: 'disabled',
  readOnly: 'readonly',
}
function cleanStateValues(states: string[]) {
  return states.map((v) => StateValues[v] ?? v)
}

function cleanOutput(output: RawOutput): RawOutput {
  const res: RawOutput = {}
  ;(Object.keys(output) as Array<Extract<string, keyof RawOutput>>).forEach((componentKey) => {
    const component = output[componentKey]
    if (componentKey.match(/Group\s[0-9]+/g)) return
    res[componentKey] = component
  })
  return res
}

function combineThemes(output: RawOutput): RawOutput<MergedComponentType> {
  let componentKeys = Object.keys(output)
  const components = componentKeys.reduce((agg, componentKey) => {
    const component = output[componentKey]
    const theme = component.theme ?? 'global'
    if (agg[component.path]) {
      agg[component.path].variants = { ...agg[component.path].variants, ...component.variants }
    } else {
      agg[component.path] = component
      agg[component.path].themes = {}
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    agg[component.path].themes![theme] = { id: component.id, theme }
    delete component.theme
    return agg
  }, {} as RawOutput<MergedComponentType>)
  componentKeys = Object.keys(components)
  componentKeys.forEach((compKey) => {
    const cmp = components[compKey]
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if ((Object.keys(cmp.themes!)?.length ?? 0) < 2) delete cmp.themes
  })
  return components
}

function variantNameToKeyValues(variantName: string) {
  return variantName
    .split(',')
    .filter(Boolean)
    .map((keyValueStr) => keyValueStr.trim().split('=') as [string, string?])
    .map(([key, value]) => ({ key: camelize(key.trim()), value: camelize((value ?? '').trim()) }))
}

function isStateKey(key: string) {
  return ['state'].includes(key.toLowerCase())
}

function processPropTypes(prop: PropData, presentInAllVariants: boolean): PropData {
  if (KnownPropTypes[prop.name]) {
    return { ...KnownPropTypes[prop.name] }
  }
  const type: PropTypes = []
  const nonBoolValues = stripBooleanValues(prop.values)
  const simpleType = nonBoolValues.length === 1
  const bool = prop.values?.length !== nonBoolValues.length && !simpleType
  const values = nonBoolValues.filter((v) => v !== DEFAULT_LABEL)
  const required = presentInAllVariants && values.length === nonBoolValues.length && !bool
  if (bool) type.push('boolean')
  return { ...prop, values, required, type }
}

function processVariants(output: RawOutput<MergedComponentType>): Output {
  const res: Output = {}

  Object.keys(output).forEach((componentKey) => {
    const states: string[] = []
    const props: Props = {}
    const counters: Record<string, number> = {}
    const { variants, ...component_ } = output[componentKey]
    const variantKeys = Object.keys(variants)
    variantKeys.forEach((variantKey) => {
      const variant = variants[variantKey]
      const keyValues = variantNameToKeyValues(variant.name)
      if (!keyValues.length) return
      keyValues.forEach(({ key, value }) => {
        if (key.match(/property\s?[0-9]+/gi)) return
        if (isStateKey(key)) {
          if (!states.includes(value)) states.push(value)
          return
        }
        if (!props[key]) props[key] = { name: key, values: [], required: true }
        if (!props[key].values?.includes(value)) props[key].values?.push(value)
        counters[key] = counters[key] ?? 0
        counters[key]++
      })
    })
    objToArr(props).forEach((prop) => {
      props[prop.name] = processPropTypes(prop, counters[prop.name] === variantKeys.length)
    })
    const component = { ...component_, states: cleanStateValues(states), props, variants }
    res[componentKey] = component
  })

  return res
}

function isThemeKey(key: string): boolean {
  return (ThemeKeys as string[]).includes(key)
}

function getNameAndPath(origName: string) {
  const nameSections = origName
    .split(/\//g)
    .map((s) => s.trim())
    .filter(Boolean)

  const path = nameSections.filter((section) => ![...ThemeKeys, 'global'].includes(section)).join('/')
  const name = camelize(nameSections[0], true)
  const lastSection = nameSections[nameSections.length - 1]
  const theme = isThemeKey(lastSection) ? lastSection : undefined
  return { name, path, theme }
}

function getComponentTokens(
  componentStyleSet: Record<string, string> | undefined,
  globalStyles: Record<string, Style>
) {
  if (!componentStyleSet) return
  const res: ComponentTokensMap = {}
  Object.keys(componentStyleSet).forEach((key) => {
    const id = componentStyleSet[key]
    const style = globalStyles[id]
    if (style) res[StyleNames[key]] = style.name
  })
  return res
}

export default async function fetchComponents(fileId: string) {
  const res = await Figma.getFile(fileId)
  const styles = res.styles
  const fileName = res.name
  const lastModified = res.lastModified
  const topLevelCanvas = getFileTopLevelChildren(res.document)
  const output: RawOutput = {}
  let frameName = ''
  let frameId = ''
  topLevelCanvas.forEach((topLevel) =>
    getWalk(extractors)((data, parent) => {
      if (!data) return
      const [id, type, node] = data

      const canvasName = topLevel.name
      if (type === 'FRAME') {
        frameName = node.name
        frameId = node.id
        return
      }
      if (type === 'COMPONENT_SET') {
        const { name, path, theme } = getNameAndPath(node.name)
        const key = path + '/' + theme
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokens = getComponentTokens((node as any)['styles'], styles)
        output[key] = { id, name, theme, frameId, frameName, canvasName, path, tokens, variants: {} }
        return
      }
      if (parent?.type === 'COMPONENT_SET') {
        const { path, theme } = getNameAndPath(parent.name)
        const key = path + '/' + theme
        output[key].variants[id] = { name: node.name }
      } else if (parent?.type === 'FRAME') {
        const { name, path, theme } = getNameAndPath(node.name)
        const key = path + '/' + theme
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokens = getComponentTokens((node as any)['styles'], styles)
        output[key] = { id, name, theme, frameId, frameName, canvasName, path, tokens, variants: {} }
        return
      }
    })(topLevel.children)
  )
  const data = pipe(cleanOutput, combineThemes, processVariants)(output)
  return {
    meta: {
      file: { id: fileId, name: fileName, lastModified },
      timestamp: new Date().getTime(),
    },
    data,
  }
}
