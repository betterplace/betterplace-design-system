import React, { HTMLInputTypeAttribute, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { from, map, forkJoin, Observable } from 'rxjs'
import { Actions, FormActions, getFormEffects, GetFormEffectsProps } from './actions'
import reducer, { getInitialState } from './reducer'
import Store from './store'
import { Values } from './types'
type ValidatorFn<T extends Values, K extends keyof T> = (value: T[K], values: T) => Promise<string | undefined>
export interface FormDispatch<T extends Values> {
  validate(): void
  setValue<K extends keyof T>(key: K, value: T[K]): void
  setValues(values: Partial<T>): void
  setTouched<K extends keyof T>(key: K, touched: boolean): void
  submit(evt?: React.FormEvent): void
  reset(): void
  register: RegisterFn<T>
  getValue: GetValueFn<T>
}
export interface FormState<T extends Values> {
  values: T
  isValid: boolean
  touched: { [key in keyof T]?: boolean }
  fieldErrors: { [key in keyof T]?: string }
  dirty: boolean
  isSubmitting: boolean
  isValidating: boolean
  error?: Error
}

export interface UseFormProps<T extends Values> {
  onValidate?: (values: T) => Promise<{ [key in keyof T]?: string }>
  onSubmit?: (values: T) => Promise<T>
  initialValues?: Partial<T> | undefined
}

export type RegisterFn<T extends Values> = (props: UseFieldProps<T, keyof T>) => {
  name: string
  onChange: React.ChangeEventHandler
  onBlur: React.FocusEventHandler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.Ref<any>
}

export type GetValueFn<T extends Values> = (props: UseFieldProps<T, keyof T>) => string

export interface UseFieldProps<T extends Values, K extends keyof T> {
  name: K
  type: HTMLInputTypeAttribute
  fromString?: (value: string) => T[K]
  asString?: (value: T[K]) => string
  validate?: ValidatorFn<T, K>
}

type UseFormReturn<T extends Values> = FormState<T> & FormDispatch<T>

export function useForm<T extends Values>(props: UseFormProps<T>): UseFormReturn<T> {
  const validatorRef = useRef<{ [K in keyof T]?: (value: T[K], values: T) => Promise<string | undefined> }>({})
  const setValidator = useCallback(
    (key: keyof T, validate?: (value: T[keyof T], values: T) => Promise<string | undefined>) => {
      if (validatorRef.current[key] === validate) return
      validatorRef.current[key] = validate
    },
    []
  )
  const removeValidator = useCallback((key: keyof T) => setValidator(key, undefined), [setValidator])
  const { onValidate: onValidate_, ...props_ } = props
  const onValidate = useCallback(
    (values: T) => {
      const globFallback = (_: T) => Promise.resolve({} as ReturnType<Exclude<typeof onValidate_, undefined>>)
      const fallback = (_: T[keyof T], __: T) => Promise.resolve(undefined)
      const global$ = from((onValidate_ ?? globFallback)(values))
      const field$ = (Object.keys(validatorRef.current) as Array<Extract<keyof T, string>>).map((key) => {
        const fn = validatorRef.current[key] ?? fallback
        return from(fn(values[key], values)).pipe(map((res) => ({ [key]: res })))
      })
      return forkJoin([...field$, global$]).pipe(
        map((errors) =>
          errors.reduce((agg, err) => ({ ...agg, ...err }), {} as { [key in keyof T]?: string | undefined })
        )
      ) as Observable<{ [key in keyof T]?: string | undefined }>
    },
    [onValidate_]
  )

  const initialRef = useRef(getInitialState<T>(props.initialValues))
  const actionsRef = useRef(new Actions<T>())
  const propsRef = useRef({ ...props_, onValidate })
  useEffect(() => {
    propsRef.current = { ...props_, onValidate }
  }, [onValidate, props_])

  const effects = useMemo(() => getFormEffects(actionsRef.current, propsRef), [])
  const store = useMemo(() => new Store<FormState<T>, FormActions<T>>(initialRef.current, reducer, effects), [effects])

  const storeRef = useRef(store)

  const [state, setState] = useState(initialRef.current)

  const register: RegisterFn<T> = useCallback(
    <K extends keyof T>(props: UseFieldProps<T, K>) => {
      return {
        ref: (instance) => {
          console.log(instance)
          if (!instance) {
            removeValidator(props.name)
            return storeRef.current.next(actionsRef.current.UnregisterField({ key: props.name }))
          }
          setValidator(props.name, props.validate as ValidatorFn<T, keyof T>)
          storeRef.current.next(actionsRef.current.RegisterField({ key: props.name }))
        },
        onChange: (evt) =>
          storeRef.current.next(
            actionsRef.current.SetValue({
              key: props.name,
              value: (props.fromString ?? String)((evt.target as HTMLInputElement).value) as T[typeof props.name],
            })
          ),
        onBlur: () => storeRef.current.next(actionsRef.current.SetTouched({ key: props.name, touched: true })),
        name: props.name as string,
      }
    },
    [removeValidator, setValidator]
  )

  const getValue = useCallback(
    <K extends keyof T>(props: UseFieldProps<T, K>) => (props.asString ?? String)(state.values[props.name]),
    [state.values]
  )
  useEffect(() => {
    const sub = storeRef.current.subscribe({
      next: (value) => {
        console.log('updating value', value)
        setState(value)
      },
      error: console.error,
    })
    return sub.unsubscribe
  }, [])

  const res = useMemo<UseFormReturn<T>>(
    () => ({
      ...state,
      submit: (evt) => {
        evt?.preventDefault()
        storeRef.current.next(actionsRef.current.Submit(undefined))
      },
      validate: () => storeRef.current.next(actionsRef.current.Validate(undefined)),
      setTouched: (key, touched) => storeRef.current.next(actionsRef.current.SetTouched({ key, touched })),
      setValue: (key, value) => storeRef.current.next(actionsRef.current.SetValue({ key, value })),
      setValues: (values) => storeRef.current.next(actionsRef.current.SetValues(values)),
      reset: () => storeRef.current.next(actionsRef.current.Reset(undefined)),
      register,
      getValue,
    }),
    [register, state, getValue]
  )
  return res
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = React.createContext<UseFormReturn<any> | null>(null)

export function FormProvider<T extends Values>(props: UseFormReturn<T> & { children?: React.ReactNode }) {
  const { children, ...data } = props
  return <FormContext.Provider value={data as unknown as UseFormReturn<T>}>{props.children}</FormContext.Provider>
}

export function useFormContext<T extends Values>(): UseFormReturn<T> {
  return React.useContext(FormContext) as unknown as UseFormReturn<T>
}
