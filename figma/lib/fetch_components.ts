import { Node } from 'figma-api'
import { ComponentMetadata } from 'figma-api/lib/api-types'
import Figma from './client'
import { getWalk } from './helpers'

const getComponent = (node: Node) => {
  if (node.type !== 'COMPONENT') return
  return [node.id, 'component', node as Node<'COMPONENT'>] as const
}

const extractors = [getComponent]
export default async function fetchComponents(fileId: string) {
  const file = await Figma.getFile(fileId)
  const topLevelChildren = (file.document.children as Array<Node<'CANVAS'>>)
    .filter((node) => node?.children?.length)
    .map((node) => node.children)
  const output: Record<string, Node<'COMPONENT'>> = {}
  const walk = getWalk(extractors, (data) => {
    const [id, _, value] = data
    output[id] = value
  })
  topLevelChildren.forEach(walk)
  return output
}
