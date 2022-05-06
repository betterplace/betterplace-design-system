import { Node } from 'figma-api'
export function rgbToHex(r: number, g: number, b: number) {
  const color = '#' + ((1 << 24) + ((r * 255) << 16) + ((g * 255) << 8) + b * 255).toString(16).slice(1)

  if (color.length > 7) {
    return color.slice(0, 7)
  }
  return color
}

export function slugify(str: string) {
  return str
  // .toLowerCase()
  // .replace(/[\W_]+/g, '-')
  // .replace(/-+/g, '-')
}

export type DataTuple<T> = readonly [string, string, T]

export type ExtractorFn<T> = (node: Node) => DataTuple<T> | undefined
export type Output<T> = Record<string, { type: string; name: string; description: string; value: T }>
export type OnDataFoundCb<T> = (data: DataTuple<T>) => void

export function getWalk<T>(extractors: Array<ExtractorFn<T>>, onDataFound: OnDataFoundCb<T>) {
  return function walk(children: Array<Node>) {
    children.forEach((child) => {
      extractors.forEach((fn) => {
        const res = fn(child)
        if (!res) return
        onDataFound(res)
      })
      if (!('children' in child) || !child.children?.length) return
      walk(child.children)
    })
  }
}
