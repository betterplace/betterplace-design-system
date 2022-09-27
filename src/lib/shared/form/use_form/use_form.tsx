import { ChangeEvent, HTMLInputTypeAttribute, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActionDispatch, ActionFactory, FormActions } from '../actions'
import reducer, { getInitialState } from '../reducer'
import Store from '../../store'
import {
  Values,
  UseFormReturn,
  FieldValidatorFn,
  FormState,
  RegisterFn,
  GlobalValidatorFn,
  Errors,
  RegisterFnOptions,
  NullableTransformFn,
  SetValidatorFn,
  UseFormProps,
  SetInstanceFn,
  HTMLNativeInput,
} from '../types'
import { unwrapFnRef, useUpdatableRef } from '../utils'
import { useValidator } from './use_validator'
import { getFormEffects } from '../side_effects'

function getRefKey<T extends Values>(key: keyof T, type?: HTMLInputTypeAttribute) {
  return `${key as string}_${type}`
}

function getValue<Source, V>(
  value: Source,
  checked: boolean,
  parse?: NullableTransformFn<Source, V>,
  type?: HTMLInputTypeAttribute
) {
  return type !== 'checkbox'
    ? (parse ?? (String as unknown as NullableTransformFn<Source, V>))(value)
    : (checked as unknown as V)
}

function useRegisterFn<T extends Values>(
  setValidator: SetValidatorFn<T>,
  setInstance: SetInstanceFn<T>,
  dispatch: ActionDispatch<T>,
  actions: ActionFactory<T>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refHash = useMemo(() => new Map<string, Ref<any>>(), [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onInstanceChange = useCallback(
    (key: keyof T, type: HTMLInputTypeAttribute | undefined, instance: Element | null | undefined) => {
      if (!key) return
      setInstance(key, instance)
      if (instance) return dispatch(actions.RegisterField({ key, type }))
      refHash.delete(getRefKey(key, type))
      return dispatch(actions.UnregisterField({ key, type }))
    },
    [actions, dispatch, refHash, setInstance]
  )

  const register: RegisterFn<T> = useCallback(
    <K extends keyof T, Source = string, V = T[K]>({
      name: key,
      validate,
      parse,
      type,
      onChange,
    }: RegisterFnOptions<T, K, Source, V>) => {
      const refKey = getRefKey(key, type)
      if (!refHash.has(refKey)) refHash.set(refKey, onInstanceChange.bind(undefined, key, type))
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ref = refHash.get(refKey)!
      /**
       *  Important to run the setValidator on the next tick, so that we avoid an immediate change to the state
       *  returned by the register function, so that we don't run into an infinite loop
       * **/
      setTimeout(() => setValidator(key, validate as FieldValidatorFn<T, keyof T>), 0)
      return {
        ref,
        onChange: (evt: ChangeEvent) => {
          const onChange_ = unwrapFnRef(onChange)
          const parse_ = unwrapFnRef(parse)
          const ele = evt.target as HTMLInputElement
          const value = getValue(ele.value as unknown as Source, ele.checked, parse_, type)
          onChange_?.(evt)
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
    [actions, onInstanceChange, setValidator, dispatch, refHash]
  )
  return register
}

function useMappedStoreDispatch<T extends Values>(dispatch: ActionDispatch<T>, actionFactory: ActionFactory<T>) {
  const mapped = useMemo<UseFormReturn<T>>(
    () =>
      ({
        submit: (evt) => {
          evt?.preventDefault()
          dispatch(actionFactory.SetDirty(true))
          dispatch(actionFactory.Submit())
        },
        validate: () => dispatch(actionFactory.Validate()),
        setAutoSubmit: (value) => dispatch(actionFactory.SetAutoSubmit(value)),
        setDirty: (value) => dispatch(actionFactory.SetDirty(value)),
        setTouched: (key, touched) => dispatch(actionFactory.SetTouched({ key, touched })),
        setValue: (key, value) => dispatch(actionFactory.SetValue({ key, value: value as T[keyof T] })),
        setValues: (values) => dispatch(actionFactory.SetValues(values)),
        reset: () => {
          dispatch(actionFactory.Reset())
          dispatch(actionFactory.Validate())
        },
      } as UseFormReturn<T>),
    [actionFactory, dispatch]
  )
  return mapped
}

/**
 * Main function of the library
 * @function
 * @template T
 * @param  {UseFormProps<T>} props
 * @returns {UseFormReturn<T>}
 */
export function useForm<T extends Values>(props: UseFormProps<T>): UseFormReturn<T> {
  const [instances, setInstance_] = useState<Map<keyof T, Element | null>>(new Map())
  const setInstance: SetInstanceFn<T> = useCallback(
    (key, instance) => {
      setInstance_((old) => {
        if (instance) return old.set(key, instance)
        old.delete(key)
        return old
      })
    },
    [setInstance_]
  )
  const [validators, setValidator_] = useState<{ [K in keyof T]?: FieldValidatorFn<T, keyof T> }>({})
  const setValidator: SetValidatorFn<T> = useCallback((key, validate) => {
    setValidator_((old) => {
      if (old[key] === validate) return old
      return { ...old, [key]: validate }
    })
  }, [])

  const { onValidate: onValidate_, ...props_ } = props

  const initialFormValueRef = useRef(
    getInitialState<T>({
      values: { ...((props.initialValues ?? {}) as T) },
      initialValues: { ...((props.initialValues ?? {}) as T) },
      autoSubmit: props.autoSubmit,
    })
  )
  const actionFactoryRef = useRef(new ActionFactory<T>())
  const onFormValuesChangeRef = useUpdatableRef(props.onFormValuesChange)

  const [state, setState] = useState(initialFormValueRef.current)
  const onValidate = useValidator(validators, state.mounted, props.onValidate)

  const propsRef = useRef({ ...props_, onValidate })
  const effects = useMemo(() => getFormEffects(actionFactoryRef.current, propsRef), [])

  const storeRef = useRef(
    new Store<FormState<T>, FormActions<T>>(initialFormValueRef.current, reducer, effects, 'Form')
  )
  useEffect(() => {
    const sub = storeRef.current.subscribe({
      next: setState,
      error: console.error,
    })
    return sub.unsubscribe
  }, [])
  useEffect(() => {
    propsRef.current = { ...props_, onValidate }
  }, [onValidate, props_])

  useEffect(() => {
    if (!onFormValuesChangeRef.current) return
    onFormValuesChangeRef.current(state.values)
  }, [state.values, onFormValuesChangeRef])

  useEffect(() => {
    storeRef.current.next(actionFactoryRef.current.SetAutoSubmit(props.autoSubmit))
  }, [props.autoSubmit])

  useEffect(() => {
    storeRef.current.next(actionFactoryRef.current.Validate())
  }, [onValidate])

  useEffect(() => {
    for (const [key, error] of Object.entries(state.fieldErrors)) {
      const ele = instances.get(key)
      if (ele && 'setCustomValidity' in ele) {
        ;(ele as HTMLNativeInput).setCustomValidity(error ?? '')
      }
    }
  }, [state.fieldErrors, instances])

  useEffect(() => {
    for (const [key, touched] of Object.entries(state.touched)) {
      if (!touched) continue
      const ele = instances.get(key)
      if (ele && 'checkValidity' in ele) {
        ;(ele as HTMLNativeInput).checkValidity()
      }
    }
  }, [state.touched, instances])

  const register = useRegisterFn(setValidator, setInstance, storeRef.current.next, actionFactoryRef.current)
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

// export default useForm
