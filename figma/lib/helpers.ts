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
    .toLowerCase()
    .replace(/[\W_]+/g, '-')
    .replace(/-+/g, '-')
}

export function camelize(str: string, capitalizeInitial?: boolean): string {
  let res = str.replace(/^([A-Z])|[\s-_]+(\w)/g, (_, p1: string, p2: string) => {
    if (p2) return p2.toUpperCase()
    return p1.toLowerCase()
  })
  if (res.length && capitalizeInitial) res = res.charAt(0).toUpperCase() + res.slice(1)
  return res
}

export type DataTuple<T, K extends string = string> = readonly [string, K, T]

export type ExtractorFn<T, K extends string = string> = (node: Node) => DataTuple<T, K> | undefined
export type Output<T> = Record<string, { type: string; name: string; description: string; value: T }>
export type OnDataFoundCb<T extends DataTuple<unknown, string>> = (data: T, parent?: Node) => void

export function getWalk<F extends ExtractorFn<unknown, string>>(extractors: readonly F[]) {
  return (onDataFound: OnDataFoundCb<ReturnType<F>>) => {
    return function walk(children: Array<Node>, parent?: Node) {
      children.forEach((child) => {
        extractors.forEach((fn) => {
          const res = fn(child) as ReturnType<F>
          if (!res) return
          onDataFound(res, parent)
        })
        if (!('children' in child) || !child.children?.length) return
        walk(child.children, child)
      })
    }
  }
}

export function getFileTopLevelChildren(file: Node<'DOCUMENT'>): Array<Node<'CANVAS'>> {
  return file.children.filter(
    (child) => ['CANVAS'].includes(child.type) && 'children' in child && child.children?.length
  ) as Array<Node<'CANVAS'>>
}
