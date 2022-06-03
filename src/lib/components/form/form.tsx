import { HTMLInputTypeAttribute, useRef } from 'react'
import { Actions, FormActions, getFormEffects } from './actions'
import reducer, { getInitialState } from './reducer'
import Store from './store'
import { Values } from './types'
export interface FormDispatch<T extends Values> {
  validate(): void
  setValue<K extends keyof T>(key: K, value: T[K]): void
  setValues(values: Partial<T>): void
  setTouched<K extends keyof T>(key: K, touched: boolean): void
  submit(): void
  reset(): void
}
export interface FormState<T extends Values> {
  values: T
  isValid: boolean
  touched: { [key in keyof T]?: boolean }
  errors: { [key in keyof T]?: string }
  dirty: boolean
  isSubmitting: boolean
  isValidating: boolean
  generalError?: Error
}

export interface UseFormProps<T extends Values> {
  onValidate?: (values: T) => Promise<{ [key in keyof T]?: string }>
  onSubmit: (values: T) => Promise<T>
  initialValues?: Partial<T> | undefined
}

export interface UseFieldProps<T extends Values, K extends keyof T> {
  name: K
  type: HTMLInputTypeAttribute
  transformValue: T[K] extends string ? never : (value: string) => T[K]
}

function createFormContext<T extends Values>()

export function useForm<T extends Values>(props: UseFormProps<T>) {
  const actions = useMemo(() => new Actions<T>(), [])
  const storeRef = useRef(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    new Store<FormState<T>, FormActions<T>>(getInitialState, reducer, getFormEffects(actions, props))
  )
}
