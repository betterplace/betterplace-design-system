import { HTMLInputTypeAttribute } from 'react'

export interface FormState<T extends Record<string, unknown>> {
  values: T
  isValid: boolean
  touched: { [key in keyof T]: boolean }
  errors: { [key in keyof T]: string }
  dirty: boolean
  validate(): void
  setValue<K extends keyof T>(key: K, value: T[K]): void
  setValues(values: Partial<T>): void
  setTouched<K extends keyof T>(key: K, touched: boolean): void
  submit(): void
  reset(): void
  isSubmitting: boolean
  isValidating: boolean
}

export interface UseFormProps<T extends Record<string, unknown>> {
  onValidate?: (values: T) => Promise<T>
  onSubmit: (values: T, form: FormState<T>) => Promise<T>
  initialValues?: Partial<T> | undefined
}

export interface UseFieldProps<T extends Record<string, unknown>, K extends keyof T> {
  name: K
  type: HTMLInputTypeAttribute
  transformValue: T[K] extends string ? never : (value: string) => T[K]
}
