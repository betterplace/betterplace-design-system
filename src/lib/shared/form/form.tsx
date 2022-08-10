import React, { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { from, map, forkJoin, Observable } from 'rxjs'
import { Actions, FormActions, getFormEffects } from './actions'
import reducer, { getInitialState } from './reducer'
import Store from '../store'
import {
  Values,
  UseFormProps,
  UseFormReturn,
  FieldValidatorFn,
  FormState,
  RegisterFn,
  UseFieldProps,
  GlobalValidatorFn,
  Errors,
  UnpackRef,
  RegisterFnOptions,
  NullableTransformFn,
} from './types'
import { promisify } from './utils'
type ObservableValidatorFn<T extends Values> = (values: T) => Observable<Errors<T>>

function mergeErrors<V extends Values, T extends Record<keyof V, unknown>>(source: T, target: T): T {
  const res = { ...target }
  Object.entries(source).forEach(([key, error]) => {
    const k = key as keyof T
    if (res[k] !== undefined && res[k] !== null) return
    res[k] = error as T[keyof T]
  })
  return res
}

export function useValidator<T extends Values>(
  fieldValidators: { [K in keyof T]?: FieldValidatorFn<T, K> },
  validatorEnabled: { [key in keyof T]?: boolean },
  global: GlobalValidatorFn<T> | undefined = (_) => ({})
): ObservableValidatorFn<T> {
  const validators: Array<ObservableValidatorFn<T>> = useMemo(() => {
    const globalised = Object.entries(fieldValidators)
      .filter(([key]) => validatorEnabled[key])
      .map(([key, fn]) => (values: T) => {
        return from(promisify(fn?.(values[key] as T[keyof T], values))).pipe(
          map((res) => ({ [key as keyof T]: res } as Errors<T>))
        )
      })
    globalised.push((values: T) => from(promisify(global(values) ?? {})) as Observable<Errors<T>>)

    return globalised
  }, [fieldValidators, validatorEnabled, global])
  const res: ObservableValidatorFn<T> = useCallback(
    (values) =>
      forkJoin(validators.map((fn) => fn(values))).pipe(
        map((errors) => errors.reduce((agg, errors) => mergeErrors(errors, agg), {} as Errors<T>))
      ),
    [validators]
  )
  return res
}

export function useForm<T extends Values>(props: UseFormProps<T>): UseFormReturn<T> {
  const [validators, setValidator_] = useState<{ [K in keyof T]?: FieldValidatorFn<T, keyof T> }>({})
  const setValidator = useCallback((key: keyof T, validate?: FieldValidatorFn<T, keyof T>) => {
    setValidator_((old) => {
      if (old[key] === validate) return old
      return { ...old, [key]: validate }
    })
  }, [])

  const { onValidate: onValidate_, ...props_ } = props

  const initialFormValueRef = useRef(getInitialState<T>({ values: { ...((props.initialValues ?? {}) as T) } }))
  const actionsRef = useRef(new Actions<T>())

  const [state, setState] = useState(initialFormValueRef.current)
  const onValidate = useValidator(validators, state.enabled, props.onValidate)
  const propsRef = useRef({ ...props_, onValidate })
  const effects = useMemo(() => getFormEffects(actionsRef.current, propsRef), [])

  const storeRef = useRef(new Store<FormState<T>, FormActions<T>>(initialFormValueRef.current, reducer, effects))

  useEffect(() => {
    propsRef.current = { ...props_, onValidate }
  }, [onValidate, props_])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInstanceChange = useCallback((key: keyof T, instance: any) => {
    setTimeout(() => {
      if (!instance) {
        return storeRef.current.next(actionsRef.current.UnregisterField({ key }))
      }
      storeRef.current.next(actionsRef.current.RegisterField({ key }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 0)
  }, [])

  const register: RegisterFn<T> = useCallback(
    <K extends keyof T, Source = string, V = T[K]>({
      name: key,
      validate,
      fromSource,
      type,
    }: RegisterFnOptions<T, K, Source, V>) => {
      setTimeout(() => setValidator(key, validate as FieldValidatorFn<T, keyof T>), 0)
      return {
        ref: onInstanceChange.bind(undefined, key),
        onChange: (evt) => {
          const value =
            type !== 'checkbox'
              ? (fromSource.current ?? (String as unknown as NullableTransformFn<Source, V>))(
                  (evt.target as HTMLInputElement).value as unknown as Source
                )
              : ((evt.target as HTMLInputElement).checked as unknown as V)
          storeRef.current.next(
            actionsRef.current.SetValue({
              key,
              value: value as T[K],
            })
          )
        },
        onBlur: () => storeRef.current.next(actionsRef.current.SetTouched({ key, touched: true })),
        name: key as string,
        type,
      }
    },
    [onInstanceChange, setValidator]
  )

  useEffect(() => {
    const sub = storeRef.current.subscribe({
      next: setState,
      error: console.error,
    })
    return sub.unsubscribe
  }, [])

  const statics = useMemo<UseFormReturn<T>>(
    () =>
      ({
        submit: (evt) => {
          evt?.preventDefault()
          storeRef.current.next(actionsRef.current.Submit(undefined))
        },
        validate: () => storeRef.current.next(actionsRef.current.Validate(undefined)),
        setTouched: (key, touched) => storeRef.current.next(actionsRef.current.SetTouched({ key, touched })),
        setValue: (key, value) =>
          storeRef.current.next(actionsRef.current.SetValue({ key, value: value as T[keyof T] })),
        setValues: (values) => storeRef.current.next(actionsRef.current.SetValues(values)),
        reset: () => storeRef.current.next(actionsRef.current.Reset(undefined)),
      } as UseFormReturn<T>),
    []
  )
  const res = useMemo<UseFormReturn<T>>(
    () => ({
      ...state,
      ...statics,
      register,
    }),
    [register, state, statics]
  )
  return res
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = React.createContext<UseFormReturn<any> | null>(null)

export function FormProvider<T extends Values>(props: UseFormReturn<T> & { children?: React.ReactNode }) {
  const { children, ...data } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <FormContext.Provider value={data as unknown as UseFormReturn<any>}>{props.children}</FormContext.Provider>
}

export function useFormContext<T extends Values>(): UseFormReturn<T> {
  return React.useContext(FormContext) as unknown as UseFormReturn<T>
}

export function useFromSourceRef<T extends Values, K extends keyof T, Source = string, V = T[K]>(
  fromString: UnpackRef<UseFieldProps<T, K, Source, V>['fromSource']>
) {
  const ref = useRef<UnpackRef<UseFieldProps<T, K, Source, V>['fromSource']>>(fromString)
  useEffect(() => {
    ref.current = fromString
  }, [fromString])
  return ref
}

export function useAsSourceRef<T extends Values, K extends keyof T, Source = string, V = T[K]>(
  asString: UnpackRef<UseFieldProps<T, K, Source, V>['asSource']>
) {
  const ref = useRef<UnpackRef<UseFieldProps<T, K, Source, V>['asSource']>>(asString)
  useEffect(() => {
    ref.current = asString
  }, [asString])
  return ref
}

export function useFieldValue<T extends Values, K extends keyof T, Source = string, V = T[K]>(
  { name, type }: Pick<UseFieldProps<T, K, Source, V>, 'type' | 'name'>,
  asSourceRef: MutableRefObject<NullableTransformFn<V, Source> | undefined>
) {
  const { values } = useFormContext<T>()
  const value = useMemo(() => {
    const value = values[name]
    if (typeof value === 'undefined' || value === null) return
    const defaultCtor = (type === 'checkbox' ? Boolean : String) as unknown as NullableTransformFn<V, Source>

    return (asSourceRef.current ?? defaultCtor)((values[name] ?? null) as V)
  }, [values, name, type, asSourceRef])
  return value
}

export function useFieldError<T extends Values, K extends keyof T>({ name }: Pick<UseFieldProps<T, K>, 'name'>) {
  const { fieldErrors: errors } = useFormContext<T>()
  const error = useMemo(() => errors[name], [errors, name])
  return error
}

export function useFieldProps<T extends Values, K extends keyof T, Source = string, V = T[K]>({
  validate,
  fromSource,
  asSource,
  type,
  name,
}: UseFieldProps<T, K, Source, V>) {
  const fromSourceRef = useFromSourceRef<T, K, Source, V>(fromSource)
  const asSourceRef = useAsSourceRef<T, K, Source, V>(asSource)
  const { register } = useFormContext<T>()

  const fieldProps_ = useMemo(
    () => register<K, Source, V>({ name, validate, type, fromSource: fromSourceRef }),
    [register, name, validate, type, fromSourceRef]
  )
  const error = useFieldError<T, K>({ name })
  const value = useFieldValue<T, K, Source, V>({ name, type }, asSourceRef)

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
