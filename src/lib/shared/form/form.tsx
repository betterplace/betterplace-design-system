import React, {
  HTMLInputTypeAttribute,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { from, map, forkJoin, Observable } from 'rxjs'
import { ActionDispatch, ActionFactory, FormActions, getFormEffects } from './actions'
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
  SetValidatorFn,
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

function useRegisterFn<T extends Values>(
  setValidator: SetValidatorFn<T>,
  dispatch: ActionDispatch<T>,
  actions: ActionFactory<T>
) {
  const onInstanceChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (key: keyof T, type: HTMLInputTypeAttribute | undefined, instance: Element | null | undefined) => {
      setTimeout(() => {
        if (!instance) return dispatch(actions.UnregisterField({ key, type }))
        dispatch(actions.RegisterField({ key, type }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, 0)
    },
    [actions, dispatch]
  )

  const register: RegisterFn<T> = useCallback(
    <K extends keyof T, Source = string, V = T[K]>({
      name: key,
      validate,
      parse,
      type,
    }: RegisterFnOptions<T, K, Source, V>) => {
      setTimeout(() => setValidator(key, validate as FieldValidatorFn<T, keyof T>), 0)
      return {
        ref: onInstanceChange.bind(undefined, key, type),
        onChange: (evt: React.ChangeEvent) => {
          const value =
            type !== 'checkbox'
              ? (parse.current ?? (String as unknown as NullableTransformFn<Source, V>))(
                  (evt.target as HTMLInputElement).value as unknown as Source
                )
              : ((evt.target as HTMLInputElement).checked as unknown as V)
          dispatch(
            actions.SetValue({
              key,
              value: value as T[K],
            })
          )
        },
        onBlur: () => dispatch(actions.SetTouched({ key, touched: true })),
        name: key as string,
        type,
      }
    },
    [actions, onInstanceChange, setValidator, dispatch]
  )
  return register
}

function useMappedStoreDispatch<T extends Values>(dispatch: ActionDispatch<T>, actionFactory: ActionFactory<T>) {
  const mapped = useMemo<UseFormReturn<T>>(
    () =>
      ({
        submit: (evt) => {
          evt?.preventDefault()
          dispatch(actionFactory.Submit(undefined))
        },
        validate: () => dispatch(actionFactory.Validate(undefined)),
        setTouched: (key, touched) => dispatch(actionFactory.SetTouched({ key, touched })),
        setValue: (key, value) => dispatch(actionFactory.SetValue({ key, value: value as T[keyof T] })),
        setValues: (values) => dispatch(actionFactory.SetValues(values)),
        reset: () => dispatch(actionFactory.Reset(undefined)),
      } as UseFormReturn<T>),
    [actionFactory, dispatch]
  )
  return mapped
}

export function useForm<T extends Values>(props: UseFormProps<T>): UseFormReturn<T> {
  const [validators, setValidator_] = useState<{ [K in keyof T]?: FieldValidatorFn<T, keyof T> }>({})
  const setValidator: SetValidatorFn<T> = useCallback((key, validate) => {
    setValidator_((old) => {
      if (old[key] === validate) return old
      return { ...old, [key]: validate }
    })
  }, [])

  const { onValidate: onValidate_, ...props_ } = props

  const initialFormValueRef = useRef(getInitialState<T>({ values: { ...((props.initialValues ?? {}) as T) } }))
  const actionFactoryRef = useRef(new ActionFactory<T>())

  const [state, setState] = useState(initialFormValueRef.current)
  const onValidate = useValidator(validators, state.mounted, props.onValidate)
  const propsRef = useRef({ ...props_, onValidate })
  const effects = useMemo(() => getFormEffects(actionFactoryRef.current, propsRef), [])

  const storeRef = useRef(
    new Store<FormState<T>, FormActions<T>>(initialFormValueRef.current, reducer, effects, 'Form')
  )

  useEffect(() => {
    propsRef.current = { ...props_, onValidate }
  }, [onValidate, props_])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useEffect(() => {
    const sub = storeRef.current.subscribe({
      next: setState,
      error: console.error,
    })
    return sub.unsubscribe
  }, [])

  const register = useRegisterFn(setValidator, storeRef.current.next, actionFactoryRef.current)
  const dispatch = useMappedStoreDispatch(storeRef.current.next, actionFactoryRef.current)
  const res = useMemo<UseFormReturn<T>>(
    () => ({
      ...state,
      ...dispatch,
      register,
    }),
    [register, state, dispatch]
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

export function useParseRef<T extends Values, K extends keyof T, Source = string, V = T[K]>(
  fromString: UnpackRef<UseFieldProps<T, K, Source, V>['parse']>
) {
  const ref = useRef<UnpackRef<UseFieldProps<T, K, Source, V>['parse']>>(fromString)
  useEffect(() => {
    ref.current = fromString
  }, [fromString])
  return ref
}

function useFormatRef<T extends Values, K extends keyof T, Source = string, V = T[K]>(
  asString: UnpackRef<UseFieldProps<T, K, Source, V>['format']>
) {
  const ref = useRef<UnpackRef<UseFieldProps<T, K, Source, V>['format']>>(asString)
  useEffect(() => {
    ref.current = asString
  }, [asString])
  return ref
}

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
}: UseFieldProps<T, K, Source, V>) {
  const parseRef = useParseRef<T, K, Source, V>(parse)
  const formatRef = useFormatRef<T, K, Source, V>(format)
  const { register } = useFormContext<T>()
  // const setValue = useCallback((value: V) => setValue_.bind(undefined, name), [setValue_, name])
  const fieldProps_ = useMemo(
    () => register<K, Source, V>({ name, validate, type, parse: parseRef }),
    [register, name, validate, type, parseRef]
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
