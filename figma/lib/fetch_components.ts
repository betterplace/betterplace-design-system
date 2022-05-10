import { Node } from 'figma-api'
import { ComponentMetadata } from 'figma-api/lib/api-types'
import Figma from './client'
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

export type PropData = Record<string, { name: string; values: string[] }>
type RawComponentsType = {
  variants: Record<string, Pick<Node<'COMPONENT'>, 'name'>>
}

type ComponentsType = { states: string[]; props: PropData }

type RawOutput<Type = RawComponentsType> = Record<
  string,
  Pick<Node<'FRAME'>, 'name'> & {
    url: string
    canvasName: string
    components: RawComponentInfo<Type>
  }
>
type RawComponentInfo<T> = Record<string, Pick<Node<'COMPONENT_SET'>, 'name' | 'id'> & { path: string } & T>

export type ComponentInfo = RawComponentInfo<ComponentsType>
export type Output = RawOutput<ComponentsType>

function findComponentSetFrameId(output: RawOutput, componentSetId: string): string {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return Object.keys(output).find((key) => !!output[key].components[componentSetId])!
}

function cleanOutput(output: RawOutput): RawOutput {
  const res: RawOutput = {}
  Object.keys(output).forEach((key) => {
    const len = Object.keys(output[key].components)?.length ?? 0
    if (!len) return
    const emptyDefault =
      !!output[key].components['none'] && !Object.keys(output[key].components['none'].variants).length
    if (len === 1 && emptyDefault) return
    res[key] = output[key]
    if (emptyDefault) {
      const { ['none']: _, ...components } = res[key].components
      res[key].components = components
    }
  })
  return res
}

function variantNameToKeyValues(variantName: string) {
  return variantName
    .split(',')
    .filter(Boolean)
    .map((keyValue) =>
      keyValue
        .trim()
        .split('=')
        .reduce(
          (_, __, ___, [key, value]) => ({ key: camelize(key.trim()), value: camelize((value ?? '').trim(), true) }),
          {
            key: '',
            value: '',
          }
        )
    )
}
function isStateKey(key: string) {
  return ['state'].includes(key.toLowerCase())
}
function processVariants(output: RawOutput): Output {
  const res: Output = {}
  Object.keys(output).forEach((frameKey) => {
    const frame = output[frameKey]
    const components: Record<string, Pick<Node<'COMPONENT_SET'>, 'name' | 'id'> & { path: string } & ComponentsType> =
      {}
    Object.keys(frame.components).forEach((componentKey) => {
      const states: string[] = []
      const props: PropData = {}
      const { variants, ...component_ } = frame.components[componentKey]
      Object.keys(variants).forEach((variantKey) => {
        const variant = variants[variantKey]
        const keyValues = variantNameToKeyValues(variant.name)
        if (!keyValues.length) return
        keyValues.forEach(({ key, value }) => {
          if (isStateKey(key)) {
            if (!states.includes(value)) states.push(value)
            return
          }
          if (!props[key]) props[key] = { name: key, values: [] }
          if (!props[key].values.includes(value)) props[key].values.push(value)
        })
      })
      const component = { ...component_, states, props }
      components[componentKey] = component
    })
    res[frameKey] = { ...frame, components }
  })
  return res
}

function getNameAndPath(origName: string) {
  const nameSections = origName
    .split(/\//g)
    .filter((section) => !!section && !['at', 'org', 'me', 'global'].includes(section))
  const path = nameSections.join('/')
  const name = camelize(nameSections[0], true)
  return { name, path }
}

export default async function fetchComponents(fileId: string) {
  const res = await Figma.getFile(fileId)
  const topLevelCanvas = getFileTopLevelChildren(res.document)
  const output: RawOutput = { ['none']: { url: '', components: {}, name: '', canvasName: '' } }
  topLevelCanvas.forEach((topLevel) =>
    getWalk(extractors)((data, parent) => {
      const [id, type, node] = data
      if (type === 'FRAME') {
        const canvasName = topLevel.name
        output[id] = { url: id, name: node.name, canvasName, components: {} }
        return
      }
      if (type === 'COMPONENT_SET') {
        const { name, path } = getNameAndPath(node.name)
        output[parent?.id ?? 'none'].components[id] = { id, name, path, variants: {} }
        return
      }
      let setId = ''
      let frameId = 'none'
      if (parent?.type === 'COMPONENT_SET') {
        setId = parent.id
        frameId = findComponentSetFrameId(output, setId)
      } else if (parent?.type === 'FRAME') {
        const { name, path } = getNameAndPath(node.name)
        output[parent?.id].components[id] = { id, name, path, variants: {} }
        return
      }
      try {
        const { name } = node
        output[frameId].components[setId].variants[id] = { name }
      } catch (_e) {
        // ignore
      }
    })(topLevel.children)
  )

  const data = processVariants(cleanOutput(output))
  return { file: fileId, data }
}
