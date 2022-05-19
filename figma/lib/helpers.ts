/* eslint-disable @typescript-eslint/no-explicit-any */
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

export function snakeify(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .join('_')
    .toLowerCase()
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

type OperatorFunction<T, T1> = (arg: T) => T1

export function pipe<T>(): (arg: T) => T
export function pipe<T, A>(op1: OperatorFunction<T, A>): (arg: T) => A
export function pipe<T, A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): (arg: T) => B
export function pipe<T, A, B, C>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>
): (arg: T) => C
export function pipe<T, A, B, C, D>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>
): (arg: T) => D
export function pipe<T, A, B, C, D, E>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>
): (arg: T) => E
export function pipe<T, A, B, C, D, E, F>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>
): (arg: T) => F
export function pipe<T, A, B, C, D, E, F, G>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>
): (arg: T) => G
export function pipe<T, A, B, C, D, E, F, G, H>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>
): (arg: T) => H
export function pipe<T, A, B, C, D, E, F, G, H, I>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>,
  op9: OperatorFunction<H, I>
): (arg: T) => I
export function pipe<T, A, B, C, D, E, F, G, H, I>(
  op1: OperatorFunction<T, A>,
  op2: OperatorFunction<A, B>,
  op3: OperatorFunction<B, C>,
  op4: OperatorFunction<C, D>,
  op5: OperatorFunction<D, E>,
  op6: OperatorFunction<E, F>,
  op7: OperatorFunction<F, G>,
  op8: OperatorFunction<G, H>,
  op9: OperatorFunction<H, I>,
  ...operations: OperatorFunction<any, any>[]
): unknown
export function pipe(...args: Array<OperatorFunction<any, any>>) {
  return (input: any) => args.reduce((agg, fn) => fn(agg), input)
}

export function objToArr<T extends Record<string | number | symbol, unknown>>(obj: T) {
  return Object.values(obj) as T[keyof T][]
}
