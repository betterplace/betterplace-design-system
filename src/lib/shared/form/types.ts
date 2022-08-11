import React, { HTMLInputTypeAttribute } from 'react'

export type Values = Record<string, unknown>

export type TransformFn<V, U> = (input: V) => U
export type NullableTransformFn<V, U> = TransformFn<V | null | undefined, U | undefined>

export type UnpackRef<T> = T extends React.MutableRefObject<infer R> ? R : T
export type UnpackRefFields<T extends {}> = { [K in keyof T]: UnpackRef<T[K]> }

export type UnpackArr<T> = T extends Array<infer V> ? V : never

export type KeysMatching<T, V> = Extract<
  NonNullable<
    {
      [K in keyof T]: [V] extends [T[K]] ? (T[K] extends V ? K : never) : never
    }[keyof T]
  >,
  string
>

export type FieldValidatorFn<T extends Values, K extends keyof T, V = T[K]> = (
  value: V,
  values: T
) => (string | undefined) | Promise<string | undefined>

export type GlobalValidatorFn<T extends Values> = (values: T) => Errors<T> | undefined | Promise<Errors<T> | undefined>
export type Errors<T> = { [key in keyof T]?: string | undefined }
export interface FormDispatch<T extends Values> {
  validate(): void
  setValue<K extends keyof T, V = T[K]>(key: K, value: V): void
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
  mounted: { [key in keyof T]?: boolean }
  removeValueOnUnmount: { [key in keyof T]?: boolean }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldKeys: { [key in keyof T]?: Array<any> }
  fieldErrors: Errors<T>
  isDirty: boolean
  isSubmitting: boolean
  isValidating: boolean
  error?: Error
  className?: string
}

export interface UseFormProps<T extends Values> {
  onValidate?: GlobalValidatorFn<T>
  onSubmit?: (values: T) => Promise<T>
  initialValues?: Partial<T>
}
export interface RegisterFnOptions<T extends Values, K extends keyof T = keyof T, Source = string, V = T[K]> {
  name: Extract<K, string>
  type?: HTMLInputTypeAttribute
  parse: React.MutableRefObject<NullableTransformFn<Source, V> | undefined>
  validate?: FieldValidatorFn<T, K, V>
  fieldArrayKey?: string
}

export interface UseFieldProps<T extends Values, K extends keyof T, Source = string, V = T[K]> {
  name: Extract<K, string>
  type?: Exclude<HTMLInputTypeAttribute, 'radio' | 'file'>
  parse?: NullableTransformFn<Source, V>
  format?: NullableTransformFn<V, Source>
  validate?: FieldValidatorFn<T, K, V>
  removeValueOnUnmount?: boolean
}

export type UseFieldArrayCommonProps<T extends Values, K extends keyof T, Source = string, V = T[K]> = {
  parse?: NullableTransformFn<Source, V>
  format?: NullableTransformFn<V, Source>
  validate?: FieldValidatorFn<T, K, V>
  name: Extract<K, string>
}

export type UseRadioButtonArrayProps<T extends Values, K extends keyof T, Source = string, V = T[K]> = {
  type: Extract<HTMLInputTypeAttribute, 'radio'>
} & UseFieldArrayCommonProps<T, K, Source, V>
export type UseGenericFieldArrayProps<
  T extends Values,
  K extends keyof T,
  Source extends Array<unknown> = string[],
  V extends Array<unknown> = string[]
> = { type?: undefined } & UseFieldArrayCommonProps<T, K, Source, V>

export type UseFieldArrayProps<T extends Values, K extends keyof T, Source = string, V = T[K]> =
  | UseRadioButtonArrayProps<T, K, Source, V>
  | (Source extends Array<infer R>
      ? V extends Array<infer U>
        ? UseGenericFieldArrayProps<T, K, Array<R>, Array<U>>
        : never
      : never)

export type RegisterFn<T extends Values> = <K extends keyof T, Source = string, V = T[K]>(
  props: RegisterFnOptions<T, K, Source, V>
) => {
  name: string
  onChange: React.ChangeEventHandler
  onBlur: React.FocusEventHandler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.Ref<any>
}

// export type GetValueFn<T extends Values> = (props: UseFieldProps<T, keyof T>) => string

export type UseFormReturn<T extends Values> = FormState<T> & FormDispatch<T>

export type SetValidatorFn<T extends Values> = (key: keyof T, validate?: FieldValidatorFn<T, keyof T>) => void
