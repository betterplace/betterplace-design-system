import { Node } from 'figma-api'
import { ComponentMetadata } from 'figma-api/lib/api-types'
import Figma from './client'
import { getWalk, getFileTopLevelChildren, camelize } from './helpers'

const getComponent = (node: Node) => {
  if (node.type !== 'COMPONENT') return
  return [node.id, 'component', node as Node<'COMPONENT'>] as const
}

const getFrame = (node: Node) => {
  if (node.type !== 'FRAME') return
  return [node.id, 'frame', node as Node<'FRAME'>] as const
}

const getComponentSet = (node: Node) => {
  if (node.type !== 'COMPONENT_SET') return
  return [node.id, 'componentSet', node as Node<'COMPONENT'>] as const
}

const extractors = [getComponent, getFrame, getComponentSet]

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
    components: Record<string, Pick<Node<'COMPONENT_SET'>, 'name'> & Type>
  }
>

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
    const components: Record<string, Pick<Node<'COMPONENT_SET'>, 'name'> & ComponentsType> = {}
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

export default async function fetchComponents(fileId: string) {
  const res = await Figma.getFile(fileId)
  const topLevelCanvas = getFileTopLevelChildren(res.document)
  // console.log(topLevelCanvas)
  const output: RawOutput = { ['none']: { url: '', components: {}, name: '', canvasName: '' } }
  topLevelCanvas.forEach((topLevel) =>
    getWalk<Node<'COMPONENT' | 'FRAME' | 'COMPONENT_SET'>>(extractors, (data, parent) => {
      const [id, type, node] = data
      if (type === 'frame') {
        const canvasName = topLevel.name
        output[id] = { url: id, name: node.name, canvasName, components: { ['none']: { name: '', variants: {} } } }
        return
      }
      if (type === 'componentSet') {
        output[parent?.id ?? 'none'].components[id] = { name: node.name, variants: {} }
        return
      }
      let setId = 'none'
      let frameId = 'none'
      if (parent?.type === 'COMPONENT_SET') {
        setId = parent.id
        frameId = findComponentSetFrameId(output, setId)
      } else if (parent?.type === 'FRAME') {
        frameId = parent.id
        output[frameId].components['none'] = { name: '', variants: {} }
      }
      try {
        const { name } = node
        output[frameId].components[setId].variants[id] = { name }
      } catch (_e) {
        // ignore
      }
    })(topLevel.children)
  )

  return processVariants(cleanOutput(output))
}
