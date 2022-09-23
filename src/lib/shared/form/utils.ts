import { useEffect, useRef } from 'react'

export function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
  if (typeof (value as Promise<T>).then === 'function') return true
  return false
}

export function promisify<T>(value: T | Promise<T>): Promise<T> {
  if (!isPromise(value)) return Promise.resolve(value)
  return value
}

export function useUpdatableRef<T>(value: T) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
