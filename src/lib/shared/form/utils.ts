export function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
  if (typeof (value as Promise<T>).then === 'function') return true
  return false
}

export function promisify<T>(value: T | Promise<T>): Promise<T> {
  if (!isPromise(value)) return Promise.resolve(value)
  return value
}
