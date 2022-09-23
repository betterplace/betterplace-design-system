import React, { HTMLInputTypeAttribute } from 'react'
export type FormValuesChangeHandler<T extends Values> = (values: T) => void

export type Values = Record<string, unknown>

export type TransformFn<V, U> = (input: V) => U

export type NullableTransformFn<V, U> = TransformFn<V | null | undefined, U | undefined>
export type ValueToKeyTransform<V> = NullableTransformFn<V extends Array<infer R> ? R : V, string>

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
  setAutoSubmit(autoSubmit?: boolean): void
  submit(evt?: React.FormEvent): void
  reset(): void
  register: RegisterFn<T>
}
export interface FormState<T extends Values> {
  /**
   * {object} representing transformed form values
   */
  values: T
  /**
   * Represents validity of the form
   * {true} if {FormState.fieldErrors} is empty
   */
  isValid: boolean
  /**
   * Field indicating whether user has changed any of the fields
   * {true} if {FormState.touched} has no {true} values
   */
  isDirty: boolean
  /**
   * Field indicating whether form is currently being submitted
   * see also:
   * - {FormDispatch.submit}
   * - {UseFormProps.onSubmit}
   */
  isSubmitting: boolean
  /**
   * Field indicating whether form is currently being validated
   * For global validation see:
   * - {FormDispatch.validate}
   * - {UseFormProps.onValidate}
   * For individual fields validation see:
   * - {UseFieldProps.onValidate}
   */
  isValidating: boolean
  /**
   * Dictionary storing information about which fields were touched by the user
   * touched flag is set by the on blur handler on individual fields
   */
  touched: { [key in keyof T]?: boolean }
  /**
   * Dictionary indicating which input are currently mounted in the DOM
   * See also:
   * - {FormState.removeValueOnUnmount}
   */
  mounted: { [key in keyof T]?: boolean }
  /**
   * Dictionary storing information about which inputs' values will be removed
   * form {FormState.values} when unmounted. The flag for changing this behaviour is set on individual fields
   * See also:
   * - {UseFieldProps.removeValueOnUnmount}
   */
  removeValueOnUnmount: { [key in keyof T]?: boolean }
  /**
   * Dictionary representing form field errors
   */
  fieldErrors: Errors<T>
  /**
   * Global error set if any of the async actions resulted with an Error
   * (ie hasn't completed)
   */
  error?: Error
  /**
   *  Proxy for underlying element className
   */
  className?: string
  /**
   * Toggles automatic submission on the form when it's valid
   */
  autoSubmit?: boolean
}

export interface UseFormProps<T extends Values> {
  /**
   * Pass a global validator function that will receive all transformed form values
   * It should return a dictionary of strings representing field errors, or a @type{Promise} of such dictionary
   * In case if no errors where encountered it should return @type{undefined} or a @type{Promise<undefined>}
   * !!It needs to be stable - so use either use useCallback or a static function
   */
  onValidate?: GlobalValidatorFn<T>
  /**
   * Function called when Submit action is triggered
   * It should return a Promise of all form values @type{Promise<T>}
   */
  onSubmit?: (values: T) => Promise<T>
  /**
   * Function called whenever form values change
   */
  onFormValuesChange?: FormValuesChangeHandler<T>
  /**
   * Initial values passed to the form, changes to this prop will not update it
   * instead call `form.setValues`
   */
  initialValues?: Partial<T>
  /**
   * Whether form will call submit action automatically whenever values change
   * are valid and the form is dirty
   */
  autoSubmit?: boolean
}

export interface RegisterFnOptions<T extends Values, K extends keyof T = keyof T, Source = string, V = T[K]> {
  name: Extract<K, string>
  type?: HTMLInputTypeAttribute
  parse: React.MutableRefObject<NullableTransformFn<Source, V> | undefined>
  validate?: FieldValidatorFn<T, K, V>
  onChange: React.MutableRefObject<React.ChangeEventHandler | undefined>
}

export interface UseFieldProps<T extends Values, K extends keyof T, Source = string, V = T[K]> {
  name: Extract<K, string>
  type?: Exclude<HTMLInputTypeAttribute, 'radio' | 'file'>
  parse?: NullableTransformFn<Source, V>
  format?: NullableTransformFn<V, Source>
  onValidate?: FieldValidatorFn<T, K, V>
  removeValueOnUnmount?: boolean
  onChange?: React.ChangeEventHandler
}

export type RegisterFn<T extends Values> = <K extends keyof T, Source = string, V = T[K]>(
  props: RegisterFnOptions<T, K, Source, V>
) => {
  name: string
  onBlur: React.FocusEventHandler
  onChange: React.ChangeEventHandler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.Ref<any>
}

// export type GetValueFn<T extends Values> = (props: UseFieldProps<T, keyof T>) => string

export type UseFormReturn<T extends Values> = FormState<T> & FormDispatch<T>

export type SetValidatorFn<T extends Values> = (key: keyof T, validate?: FieldValidatorFn<T, keyof T>) => void
