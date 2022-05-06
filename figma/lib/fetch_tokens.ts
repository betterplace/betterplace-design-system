import Figma from './client'
import { Node, StylesMap, TypeStyle } from 'figma-api'
import { ExtractorFn, getWalk, rgbToHex, slugify } from './helpers'
type DataType = string | TypeStyle
type Output = Record<string, { type: string; name: string; description: string; value: DataType }>
const getColorData: ExtractorFn<string> = (node) => {
  if (!('styles' in node)) return
  const nodeId = node.styles?.['fill'] as unknown as StylesMap['FILL'] // #bug in typings
  if (!nodeId) return
  if (!('fills' in node)) return
  const color = node.fills[0]?.color
  if (!color) return
  const { r, g, b } = color
  return [nodeId, 'color', rgbToHex(r, g, b)] as const
}

const getTextData: ExtractorFn<TypeStyle> = (node: Node) => {
  if (!('styles' in node)) return
  const nodeId = node.styles?.['text'] as unknown as StylesMap['TEXT'] // #bug in typings
  if (!nodeId) return
  if (!('characters' in node)) return
  if (!node.style || !Object.keys(node.style).length) return
  return [nodeId, 'text', node.style] as const
}
// TODO: check the data extraction possibilities for grid
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getGridData = (node: Node) => {
  if (!('styles' in node)) return
  const nodeId = node.styles?.['grid'] as unknown as StylesMap['GRID'] // #bug in typings
  if (!nodeId) return
  if (!('???' in node)) return
  return undefined
}

const extractors = [getColorData, getTextData]
export default async function fetchTokens(fileId: string) {
  const tokens: Record<string, Output> = {}

  const file = await Figma.getFile(fileId)
  const topLevelChildren = (file.document.children as Array<Node<'CANVAS'>>)
    .filter((node) => node?.children?.length)
    .map((node) => node.children)
  const styles = file.styles

  const walk = getWalk<string | TypeStyle>(extractors, (data) => {
    const [nodeId, type, value] = data
    const style = styles[nodeId]
    if (!style || !style.name) return
    const description = style.description
    const name = slugify(style.name)
    if (!tokens[type]) {
      tokens[type] = {}
    }
    tokens[type][nodeId] = { type, name, value, description }
  })

  topLevelChildren.forEach(walk)
  return tokens
}
