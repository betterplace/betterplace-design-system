import { MutableRefObject, useMemo } from 'react'
import { useFormContext } from '../form_context'
import { Values, UseFieldProps, NullableTransformFn } from '../types'
import { useUpdatableRef } from '../utils'

function useFieldValue<T extends Values, K extends keyof T, Source = string, V = T[K]>(
  { name, type }: Pick<UseFieldProps<T, K, Source, V>, 'type' | 'name'>,
  formatRef: MutableRefObject<NullableTransformFn<V, Source> | undefined>
) {
  const { values } = useFormContext<T>()
  const value = useMemo(() => {
    const value = values[name]
    const defaultCtor = (type === 'checkbox' ? Boolean : String) as unknown as NullableTransformFn<V, Source>

    return (formatRef.current ?? defaultCtor)((value ?? undefined) as V)
  }, [values, name, type, formatRef])
  return value
}

export function useFieldError<T extends Values, K extends keyof T>({ name }: Pick<UseFieldProps<T, K>, 'name'>) {
  const { fieldErrors: errors } = useFormContext<T>()
  const error = useMemo(() => errors[name], [errors, name])
  return error
}
export function useFieldProps<T extends Values, K extends keyof T, Source = string, V = T[K]>({
  validate,
  parse,
  format,
  type,
  name,
  onChange,
}: UseFieldProps<T, K, Source, V>) {
  const parseRef = useUpdatableRef(parse)
  const formatRef = useUpdatableRef(format)
  const onChangeRef = useUpdatableRef(onChange)
  const { register } = useFormContext<T>()
  // const setValue = useCallback((value: V) => setValue_.bind(undefined, name), [setValue_, name])
  const fieldProps_ = useMemo(
    () => register<K, Source, V>({ name, validate, type, parse: parseRef, onChange: onChangeRef }),
    [register, name, validate, type, parseRef, onChangeRef]
  )
  const error = useFieldError<T, K>({ name })
  const value = useFieldValue<T, K, Source, V>({ name, type }, formatRef)

  const fieldProps = useMemo(
    () => ({
      ...fieldProps_,
      ...(type === 'checkbox' ? { checked: !!value as boolean } : { value }),
      type,
      ...(error ? { ['data-error']: error, ['data-invalid']: !!error } : {}),
    }),
    [fieldProps_, value, type, error]
  )
  return fieldProps
}

export default useFieldProps
