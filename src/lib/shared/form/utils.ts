import { MutableRefObject, useEffect, useRef } from 'react'

export function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
  if (typeof (value as Promise<T>).then === 'function') return true
  return false
}

export function promisify<T>(value: T | Promise<T>): Promise<T> {
  if (!isPromise(value)) return Promise.resolve(value)
  return value
}

export function promisifyFn<T>(fn?: () => T | Promise<T>): Promise<T | undefined> {
  if (typeof fn !== 'function') return Promise.resolve(undefined)
  try {
    const value = fn()
    return promisify(value)
  } catch (e) {
    return Promise.reject(e)
  }
}

export function useUpdatableRef<T>(value: T) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export function unwrapFnRef<T extends (...args: any) => any | undefined>(
  fnOrRef: MutableRefObject<T | undefined> | T | undefined
) {
  return typeof fnOrRef === 'function' ? fnOrRef : fnOrRef?.current
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<F extends (...args: any[]) => void>(callback: F, wait: number, immediate = false) {
  let timeout: NodeJS.Timeout | null = null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((...args: any[]) => {
    const callNow = immediate && !timeout
    const next = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      callback.apply(this, args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(next, wait)

    if (callNow) next()
  }) as F
}
