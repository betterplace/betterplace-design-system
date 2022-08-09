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
  UnpackRef,
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
      console.log(old, key, validate)
      if (old[key] === validate) return old
      return { ...old, [key]: validate }
    })
  }, [])

  const { onValidate: onValidate_, ...props_ } = props

  const initialRef = useRef(getInitialState<T>({ values: { ...((props.initialValues ?? {}) as T) } }))
  const actionsRef = useRef(new Actions<T>())

  const [state, setState] = useState(initialRef.current)
  const onValidate = useValidator(validators, state.enabled, props.onValidate)
  const propsRef = useRef({ ...props_, onValidate })
  const effects = useMemo(() => getFormEffects(actionsRef.current, propsRef), [])

  const storeRef = useRef(new Store<FormState<T>, FormActions<T>>(initialRef.current, reducer, effects))

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
    ({ name: key, validate, fromStringRef: fromString, type }) => {
      setValidator(key, validate as FieldValidatorFn<T, keyof T>)
      return {
        ref: onInstanceChange.bind(undefined, key),
        onChange: (evt) =>
          storeRef.current.next(
            actionsRef.current.SetValue({
              key,
              value: (fromString.current ?? String)((evt.target as HTMLInputElement).value) as T[typeof key],
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
      complete: () => console.log('Stream ended'),
    })
    return () => {
      console.log('Unmount')
      sub.unsubscribe()
    }
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
export function useFromStringRef<T extends Values>(fromString: UnpackRef<UseFieldProps<T, keyof T>['fromString']>) {
  const ref = useRef<UnpackRef<UseFieldProps<T, keyof T>['fromString']>>(fromString)
  useEffect(() => {
    ref.current = fromString
  }, [fromString])
  return ref
}

export function useAsStringRef<T extends Values>(asString: UnpackRef<UseFieldProps<T, keyof T>['asString']>) {
  const ref = useRef<UnpackRef<UseFieldProps<T, keyof T>['asString']>>(asString)
  useEffect(() => {
    ref.current = asString
  }, [asString])
  return ref
}
export function useFieldProps<T extends Values>({
  validate,
  fromString,
  asString,
  type,
  name,
}: UseFieldProps<T, keyof T>) {
  const fromStringRef = useFromStringRef<T>(fromString)
  const asStringRef = useAsStringRef<T>(asString)
  const { register, values } = useFormContext<T>()

  const ret_ = useMemo(
    () => register({ name, validate, type, fromStringRef }),
    [register, name, validate, type, fromStringRef]
  )

  const value = useMemo(
    () =>
      values[name] !== null && values[name] !== undefined
        ? (asStringRef.current ?? String)((values[name] ?? null) as T[keyof T])
        : undefined,
    [asStringRef, name, values]
  )

  const ret = useMemo(() => ({ ...ret_, value }), [ret_, value])
  return ret
}
