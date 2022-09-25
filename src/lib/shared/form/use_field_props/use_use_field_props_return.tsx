import { UseFieldProps, Values } from '../types'
import useFieldProps from './use_field_props'

class Wrapper<T extends Values, K extends keyof T, Source = string, V = T[K]> {
  // wrapped has no explicit return type so we can infer it
  wrapped(e: UseFieldProps<T, K, Source, V>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFieldProps<T, K, Source, V>(e)
  }
}

type UseFieldPropsReturn<T extends Values, K extends keyof T, Source = string, V = T[K]> = ReturnType<
  Wrapper<T, K, Source, V>['wrapped']
>

export function useUseFieldPropsReturn<T extends Values, K extends keyof T, Source = string, V = T[K]>(
  _: UseFieldPropsReturn<T, K, Source, V>
) {
  return null
}
