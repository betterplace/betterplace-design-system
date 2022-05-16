import { Node } from 'figma-api'
import { ComponentMetadata, GetFileResult } from 'figma-api/lib/api-types'
import Figma from './client'
import AVAILABLE_THEMES from '../../src/lib/shared/themes'
const THEME_KEYS = AVAILABLE_THEMES.map(({ key }) => key)
import { getWalk, getFileTopLevelChildren, camelize, ExtractorFn } from './helpers'

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
  { name, id: fileId }: FileInfo,
  { id: id_, themes }: ComponentInfo,
  theme?: string
) {
  const id = (theme && themes[theme]?.id) ?? id_
  return `${process.env.STORYBOOK_FIGMA_URL}/file/${fileId}/${name}?node-id=${encodeURIComponent(id)}`
}

export type PropData = Record<string, { mandatory: boolean; name: string; values: string[] }>
type RawComponentsType = {
  variants: Record<string, Pick<Node<'COMPONENT'>, 'name'>>
  theme?: string
}
export type ThemeData = Record<string, { id: string; theme: string }>
type MergedComponentType = Omit<RawComponentsType, 'theme'> & { themes?: ThemeData }

type ComponentsType = { states: string[]; props: PropData; themes?: ThemeData }
type CommonComponentInfo = Pick<Node<'COMPONENT_SET'>, 'name' | 'id'> & {
  path: string
  canvasName: string
  frameId: string
  frameName: string
}
type RawOutput<Type extends {} = RawComponentsType> = Record<string, RawComponentInfo<Type>>
type RawComponentInfo<T extends {}> = CommonComponentInfo & T

export type FileInfo = { name: string; id: string }

export type Output = RawOutput<ComponentsType>
export type ComponentInfo = RawComponentInfo<ComponentsType>

function cleanOutput<T extends RawOutput>(output: T): T {
  const res: T = {} as T
  Object.keys(output).forEach((key: Extract<string, keyof T>) => {
    const comp = output[key]
    if (key.match(/Group\s[0-9]+/g)) return
    res[key] = comp
  })
  return res
}

function combineThemes(output: RawOutput): RawOutput<MergedComponentType> {
  let compKeys = Object.keys(output)
  const components = compKeys.reduce((agg, compKey) => {
    const cmp = output[compKey]
    const theme = cmp.theme ?? 'global'
    if (agg[cmp.path]) {
      agg[cmp.path].variants = { ...agg[cmp.path].variants, ...cmp.variants }
    } else {
      agg[cmp.path] = cmp
      agg[cmp.path].themes = {}
    }
    agg[cmp.path].themes[theme] = { id: cmp.id, theme }
    delete cmp.theme
    return agg
  }, {} as RawOutput<MergedComponentType>)
  compKeys = Object.keys(components)
  compKeys.forEach((compKey) => {
    const cmp = components[compKey]
    if ((Object.keys(cmp.themes)?.length ?? 0) < 2) delete cmp.themes
  })
  return components
}

function variantNameToKeyValues(variantName: string) {
  return variantName
    .split(',')
    .filter(Boolean)
    .map((keyValue) =>
      keyValue
        .trim()
        .split('=')
        .reduce((_, __, ___, [key, value]) => ({ key: camelize(key.trim()), value: camelize((value ?? '').trim()) }), {
          key: '',
          value: '',
        })
    )
}
function isStateKey(key: string) {
  return ['state'].includes(key.toLowerCase())
}
function processVariants(output: RawOutput<MergedComponentType>): Output {
  const res: Output = {}

  Object.keys(output).forEach((componentKey) => {
    const states: string[] = []
    const props: PropData = {}
    const counters: Record<string, number> = {}
    const { variants, ...component_ } = output[componentKey]
    const variantKeys = Object.keys(variants)
    variantKeys.forEach((variantKey) => {
      const variant = variants[variantKey]
      const keyValues = variantNameToKeyValues(variant.name)
      if (!keyValues.length) return
      keyValues.forEach(({ key, value }) => {
        if (isStateKey(key)) {
          if (!states.includes(value)) states.push(value)
          return
        }
        if (!props[key]) props[key] = { name: key, values: [], mandatory: true }
        if (!props[key].values.includes(value)) props[key].values.push(value)
        counters[key] = counters[key] ?? 0
        counters[key]++
      })
    })
    Object.keys(props).forEach((key) => {
      const prop = props[key]
      prop.mandatory = counters[key] === variantKeys.length && !prop.values.includes('default')
    })
    const component = { ...component_, states, props }
    res[componentKey] = component
  })

  return res
}

function isThemeKey(key: string): boolean {
  return (THEME_KEYS as string[]).includes(key)
}

function getNameAndPath(origName: string) {
  const nameSections = origName
    .split(/\//g)
    .map((s) => s.trim())
    .filter(Boolean)

  const path = nameSections.filter((section) => ![...THEME_KEYS, 'global'].includes(section)).join('/')
  const name = camelize(nameSections[0], true)
  const lastSection = nameSections[nameSections.length - 1]
  const theme = isThemeKey(lastSection) ? lastSection : undefined
  return { name, path, theme }
}

export default async function fetchComponents(fileId: string) {
  const res = await Figma.getFile(fileId)
  const fileName = res.name
  const topLevelCanvas = getFileTopLevelChildren(res.document)
  const output: RawOutput = {}
  let frameName = ''
  let frameId = ''
  topLevelCanvas.forEach((topLevel) =>
    getWalk(extractors)((data, parent) => {
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
        output[key] = { id, name, theme, frameId, frameName, canvasName, path, variants: {} }
        return
      }
      if (parent?.type === 'COMPONENT_SET') {
        const { path, theme } = getNameAndPath(parent.name)
        const key = path + '/' + theme
        output[key].variants[id] = { name: node.name }
      } else if (parent?.type === 'FRAME') {
        const { name, path, theme } = getNameAndPath(node.name)
        const key = path + '/' + theme
        output[key] = { id, name, theme, frameId, frameName, canvasName, path, variants: {} }
        return
      }
    })(topLevel.children)
  )

  const data = processVariants(combineThemes(cleanOutput(output)))
  return {
    meta: {
      file: { id: fileId, name: fileName },
      timestamp: new Date().getTime(),
    },
    data,
  }
}
