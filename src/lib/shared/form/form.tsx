import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
} from './types'
import { promisify } from './utils'
type ObservableValidatorFn<T extends Values> = (values: T) => Observable<Errors<T>>

function mergeErrors<V extends Values, T extends Record<keyof V, unknown>>(source: T, origin: T): T {
  const res = { ...origin }
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

  const initialRef = useRef(getInitialState<T>({ values: { ...((props.initialValues ?? {}) as T) } }))
  const actionsRef = useRef(new Actions<T>())

  const effects = useMemo(() => getFormEffects(actionsRef.current, propsRef), [])
  const store = useMemo(() => new Store<FormState<T>, FormActions<T>>(initialRef.current, reducer, effects), [effects])

  const storeRef = useRef(store)

  const [state, setState] = useState(initialRef.current)
  const onValidate = useValidator(validators, state.enabled, props.onValidate)
  const propsRef = useRef({ ...props_, onValidate })
  useEffect(() => {
    propsRef.current = { ...props_, onValidate }
  }, [onValidate, props_])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInstanceChange = useCallback((key: keyof T, instance: any) => {
    if (!instance) {
      return storeRef.current.next(actionsRef.current.UnregisterField({ key }))
    }
    storeRef.current.next(actionsRef.current.RegisterField({ key }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const register: RegisterFn<T> = useCallback(
    <K extends keyof T>({ name: key, validate, fromString, type }: UseFieldProps<T, K>) => {
      setValidator(key, validate as FieldValidatorFn<T, keyof T>)
      return {
        ref: onInstanceChange.bind(undefined, key),
        onChange: (evt) =>
          storeRef.current.next(
            actionsRef.current.SetValue({
              key,
              value: (fromString ?? String)((evt.target as HTMLInputElement).value) as T[typeof key],
            })
          ),
        onBlur: () => storeRef.current.next(actionsRef.current.SetTouched({ key, touched: true })),
        name: key as string,
        type,
      }
    },
    [onInstanceChange, setValidator]
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

  const statics = useMemo<UseFormReturn<T>>(
    () =>
      ({
        submit: (evt) => {
          evt?.preventDefault()
          storeRef.current.next(actionsRef.current.Submit(undefined))
        },
        validate: () => storeRef.current.next(actionsRef.current.Validate(undefined)),
        setTouched: (key, touched) => storeRef.current.next(actionsRef.current.SetTouched({ key, touched })),
        setValue: (key, value) => storeRef.current.next(actionsRef.current.SetValue({ key, value })),
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
  return <FormContext.Provider value={data as unknown as UseFormReturn<T>}>{props.children}</FormContext.Provider>
}

export function useFormContext<T extends Values>(): UseFormReturn<T> {
  return React.useContext(FormContext) as unknown as UseFormReturn<T>
}

export function useFieldProps<T extends Values>(props: UseFieldProps<T, keyof T>) {
  const { register, values } = useFormContext<T>()
  const ret_ = useMemo(
    () => register({ name: props.name, validate: props.validate, type: props.type, fromString: props.fromString }),
    [props.name, props.validate, props.type, props.fromString, register]
  )
  const value = useMemo(
    () => (props.asString ?? String)((values[props.name] ?? null) as T[keyof T]),
    [props.name, props.asString, values]
  )
  const ret = useMemo(() => ({ ...ret_, value }), [ret_, value])
  return ret
}
