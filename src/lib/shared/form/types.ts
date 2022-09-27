import { ChangeEventHandler, FocusEventHandler, FormEvent, HTMLInputTypeAttribute, MutableRefObject, Ref } from 'react'
import type { Observable } from 'rxjs'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnpackHTMLElement<T> = T extends React.DetailedHTMLProps<React.HTMLAttributes<infer V>, any> ? V : never
export type HTMLNativeInput = Extract<
  UnpackHTMLElement<JSX.IntrinsicElements[keyof JSX.IntrinsicElements]>,
  { setCustomValidity: (validity: string) => void }
>
export type Values = Record<string, unknown>

export type TransformFn<V, U> = (input: V) => U

export type SetInstanceFn<T extends Values> = (key: keyof T, instance?: Element | null) => void
export type NullableTransformFn<V, U> = TransformFn<V | null | undefined, U | undefined>
export type ValueToKeyTransform<V> = NullableTransformFn<V extends Array<infer R> ? R : V, string>

export type UnpackRef<T> = T extends MutableRefObject<infer R> ? R : T
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
  /**
   * Triggers validation
   */
  validate(): void
  /**
   *
   * @param key field name
   * @param value parsed value
   */
  setValue<K extends keyof T, V = T[K]>(key: K, value: V): void
  /**
   *
   * @param values partial form values
   */
  setValues(values: Partial<T>): void
  /**
   *
   * @param key field name
   * @param touched whether the field is considered touched
   */
  setTouched<K extends keyof T>(key: K, touched: boolean): void
  /**
   * Sets the auto-submit flag
   * @param autoSubmit set autoSubmit flag.
   * See:
   * - {FormState.autoSubmit}
   */
  setAutoSubmit(autoSubmit?: boolean): void
  /**
   * Marks form as dirty
   * @param dirty whether to mark form as dirty
   */
  setDirty(dirty: boolean): void
  /**
   * Submits the form
   * @param evt form event
   */
  submit(evt?: FormEvent): void
  /**
   * Resets the form to initial values
   * See:
   * - {UseFormProps.initialValues}
   */
  reset(): void
  /**
   * Manually register a field. Normally use `useFieldProps`
   */
  register: RegisterFn<T>
}
export interface FormState<T extends Values> {
  /**
   * {object} representing transformed form values
   */
  readonly values: T
  /**
   * Represents validity of the form
   * {true} if {FormState.fieldErrors} is empty
   */
  readonly isValid: boolean
  /**
   * Field indicating whether user has changed any of the fields
   * {true} if {FormState.touched} has no {true} values
   */
  readonly isDirty: boolean
  /**
   * Field indicating whether form is currently being submitted
   * See:
   * - @see {@link FormDispatch FormDispatch.submit}
   * - @see {@link UseFormProps UseFormProps.onSubmit}
   */
  readonly isSubmitting: boolean
  /**
   * Field indicating whether form is currently being validated
   * For global validation see:
   * - {FormDispatch.validate}
   * - {UseFormProps.onValidate}
   * For individual fields validation see:
   * - {UseFieldProps.onValidate}
   */
  readonly isValidating: boolean
  /**
   * Dictionary storing information about which fields were touched by the user
   * touched flag is set by the on blur handler on individual fields
   */
  readonly touched: { [key in keyof T]?: boolean }
  /**
   * Dictionary indicating which input are currently mounted in the DOM
   * See also:
   * - {FormState['removeValueOnUnmount']}
   */
  readonly mounted: { [key in keyof T]?: boolean }
  /**
   * Dictionary storing information about which inputs' values will be removed
   * form @type {FormState.values} when unmounted. The flag for changing this behaviour is set on individual fields
   * See also:
   * @see {@link UseFieldProps<T, K, Source, V>['removeValueOnUnmount']}
   */
  readonly removeValueOnUnmount: { [key in keyof T]?: boolean }
  /**
   * Dictionary representing form field errors
   */
  readonly fieldErrors: Errors<T>
  /**
   * Global error set if any of the async actions resulted with an Error
   * (ie hasn't completed)
   */
  readonly error?: Error
  /**
   *  Proxy for underlying element className
   */
  readonly className?: string
  /**
   * Toggles automatic submission on the form when it's valid
   */
  readonly autoSubmit?: boolean

  readonly initialValues: T
}

export interface RegisterFnOptions<T extends Values, K extends keyof T = keyof T, Source = string, V = T[K]> {
  /**
   * Input name attribute
   */
  name: Extract<K, string>
  /**
   * Input type attribute
   */
  type?: HTMLInputTypeAttribute
  /**
   * Transform function that takes the form {Source} (usually string, unless a custom component is used)
   * and transforms it into the value stored in the {FormState['values']}. This function will be triggered whenever field value changes
   * alternatively you can provide a {React.MutableRefObject} instead if you are planning on making the function dynamic
   */
  parse?: MutableRefObject<NullableTransformFn<Source, V> | undefined> | NullableTransformFn<Source, V>
  /**
   * Pass a validator function that will receive the field value and  all transformed form values
   * If the validation fails it should return a  `string` with the error or a `Promise<string>`
   * otherwise `undefined` or `Promise<undefined>`
   * Signature:
   * `<T extends Values, K extends keyof T, V = T[K]>(value: V, values: T) => Promise<string | undefined> | string | undefined`
   *
   * !!It needs to be stable - so use either use useCallback or a static function
   */
  validate?: FieldValidatorFn<T, K, V>
  /**
   * optional `React.ChangeEventHandler`
   */
  onChange?: MutableRefObject<ChangeEventHandler | undefined> | ChangeEventHandler
}

export interface UseFieldProps<T extends Values, K extends keyof T, Source = string, V = T[K]> {
  name: Extract<K, string>
  type?: Exclude<HTMLInputTypeAttribute, 'radio' | 'file'>
  parse?: NullableTransformFn<Source, V>
  format?: NullableTransformFn<V, Source>
  validate?: FieldValidatorFn<T, K, V>
  removeValueOnUnmount?: boolean
  onChange?: ChangeEventHandler
}

export type RegisterFn<T extends Values> = <K extends keyof T, Source = string, V = T[K]>(
  props: RegisterFnOptions<T, K, Source, V>
) => {
  name: string
  onBlur: FocusEventHandler
  onChange: ChangeEventHandler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: Ref<any>
}

// export type GetValueFn<T extends Values> = (props: UseFieldProps<T, keyof T>) => string

export type UseFormReturn<T extends Values> = FormState<T> & FormDispatch<T>

export type SetValidatorFn<T extends Values> = (key: keyof T, validate?: FieldValidatorFn<T, keyof T>) => void

export type FormValuesChangeHandler<T extends Values> = (values: T) => void

export interface UseFormProps<T extends Values> {
  /**
   * Pass a global validator function that will receive all transformed form values
   * It should return a dictionary of strings representing field errors, or a @type {Promise} of such dictionary
   * In case if no errors where encountered it should return @type {undefined} or a @type { Promise<undefined> }
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

export type ObservableValidatorFn<T extends Values> = (values: T) => Observable<Errors<T>>

export type FieldValidators<T extends Values> = { [K in keyof T]?: FieldValidatorFn<T, K> }

export type FieldsEnabled<T extends Values> = FormState<T>['mounted']
