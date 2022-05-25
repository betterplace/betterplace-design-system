import Figma from './client'
import { Node, StylesMap, TypeStyle } from 'figma-api'
import { ExtractorFn, getFileTopLevelChildren, getWalk, rgbToHex } from './helpers'
type DataType = string | TypeStyle
type Output = Record<string, { type: string; name: string; description: string; value: DataType; frameName: string }>
const getColorData: ExtractorFn<string> = (node) => {
  if (!('styles' in node)) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeId = (node.styles as any)?.['fill'] as unknown as StylesMap['FILL'] // #bug in typings
  if (!nodeId) return
  if (!('fills' in node)) return
  const color = node.fills[0]?.color
  if (!color) return
  const { r, g, b } = color
  return [nodeId, 'color', rgbToHex(r, g, b)] as const
}

const getTextData: ExtractorFn<TypeStyle> = (node: Node) => {
  if (!('styles' in node)) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeId = (node.styles as any)?.['text'] as unknown as StylesMap['TEXT'] // #bug in typings
  if (!nodeId) return
  if (!('characters' in node)) return
  if (!node.style || !Object.keys(node.style).length) return
  return [nodeId, 'text', node.style] as const
}
// TODO: check the data extraction possibilities for grid
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getGridData = (node: Node) => {
  if (!('styles' in node)) return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeId = (node.styles as any)?.['grid'] as unknown as StylesMap['GRID'] // #bug in typings
  if (!nodeId) return
  if (!('???' in node)) return
  return undefined
}

const extractors = [getColorData, getTextData] as const
export default async function fetchTokens(fileId: string) {
  const tokens: Record<string, Output> = {}

  const res = await Figma.getFile(fileId)
  const topLevelCanvas = getFileTopLevelChildren(res.document)
  const styles = res.styles

  topLevelCanvas.forEach((topLevel) =>
    getWalk(extractors)((data) => {
      if (!data) return
      const [nodeId, type, value] = data
      const style = styles[nodeId]
      if (!style || !style.name) return
      const description = style.description
      const name = style.name
      if (!tokens[type]) {
        tokens[type] = {}
      }
      const frameName = topLevel.name
      tokens[type][nodeId] = { type, name, value, description, frameName }
    })(topLevel.children)
  )
  return tokens
}
