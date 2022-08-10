import React, { HTMLInputTypeAttribute } from 'react'

export type Values = Record<string, unknown>

export type UnpackRef<T> = T extends React.MutableRefObject<infer R> ? R : T
export type UnpackRefFields<T extends {}> = { [K in keyof T]: UnpackRef<T[K]> }

export type KeysMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never }[keyof T]

export type FieldValidatorFn<T extends Values, K extends keyof T> = (
  value: T[K],
  values: T
) => (string | undefined) | Promise<string | undefined>

export type GlobalValidatorFn<T extends Values> = (values: T) => Errors<T> | undefined | Promise<Errors<T> | undefined>
export type Errors<T> = { [key in keyof T]?: string | undefined }
export interface FormDispatch<T extends Values> {
  validate(): void
  setValue<K extends keyof T>(key: K, value: T[K]): void
  setValues(values: Partial<T>): void
  setTouched<K extends keyof T>(key: K, touched: boolean): void
  submit(evt?: React.FormEvent): void
  reset(): void
  register: RegisterFn<T>
}
export interface FormState<T extends Values> {
  values: T
  isValid: boolean
  touched: { [key in keyof T]?: boolean }
  enabled: { [key in keyof T]?: boolean }
  removeValueOnUnmount: { [key in keyof T]?: boolean }
  fieldErrors: Errors<T>
  isDirty: boolean
  isSubmitting: boolean
  isValidating: boolean
  error?: Error
}

export interface UseFormProps<T extends Values> {
  onValidate?: GlobalValidatorFn<T>
  onSubmit?: (values: T) => Promise<T>
  initialValues?: Partial<T>
}
export interface RegisterFnOptions<T extends Values, K extends keyof T = keyof T> {
  name: K
  type?: HTMLInputTypeAttribute
  fromStringRef: React.MutableRefObject<((value: string) => T[K]) | undefined>
  validate?: FieldValidatorFn<T, K>
}

export interface UseFieldProps<T extends Values, K extends keyof T> {
  name: K
  type?: HTMLInputTypeAttribute
  fromString?: (value: string) => T[K]
  asString?: (value: T[K]) => string
  validate?: FieldValidatorFn<T, K>
  removeValueOnUnmount?: boolean
}
export type RegisterFn<T extends Values> = <K extends keyof T>(
  props: RegisterFnOptions<T, K>
) => {
  name: string
  onChange: React.ChangeEventHandler
  onBlur: React.FocusEventHandler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.Ref<any>
}

export type GetValueFn<T extends Values> = (props: UseFieldProps<T, keyof T>) => string

export type UseFormReturn<T extends Values> = FormState<T> & FormDispatch<T>
