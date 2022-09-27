import { RegisterFnOptions, Values } from '../types'

export function useUseFormReturnRegister<T extends Values, K extends keyof T, Source = string, V = T[K]>(
  _: RegisterFnOptions<T, K, Source, V>
) {
  return null
}
