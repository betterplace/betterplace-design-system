/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionType } from '../store/types'
import { ActionFactory, FormActions } from './actions'
import { Values, FormState } from './types'

const FormReducer = <T extends Values>(state: FormState<T>, action: FormActions<T>): FormState<T> => {
  switch (action.type) {
    case 'Form/Submit':
      return { ...state, isSubmitting: true, error: undefined }
    case 'Form/SubmitError':
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
      }
    case 'Form/SubmitSuccess':
    case 'Form/SetValues':
      return {
        ...state,
        isSubmitting: false,
        error: undefined,
        values: { ...state.values, ...action.payload },
        touched: {},
        isDirty: false,
      }
    case 'Form/SetValue':
      return {
        ...state,
        values: { ...state.values, [action.payload.key]: action.payload.value },
        touched: {
          ...state.touched,
          [action.payload.key]: action.payload.internal && action.payload.value !== state.values[action.payload.key],
        },
        isDirty:
          (action.payload.internal && action.payload.value !== state.values[action.payload.key]) || state.isDirty,
      }
    case 'Form/Validate':
      return {
        ...state,
        isValidating: true,
        error: undefined,
        fieldErrors: {},
      }
    case 'Form/ValidateSuccess':
      return {
        ...state,
        isValidating: false,
        error: undefined,
        fieldErrors: action.payload,
        isValid: !Object.values(action.payload).filter(Boolean).length,
      }
    case 'Form/ValidateError':
      return {
        ...state,
        isValidating: false,
        error: action.payload,
      }
    case 'Form/SetTouched':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.key]: action.payload.touched,
        },
        isDirty: action.payload.touched || state.isDirty,
      }
    case 'Form/RegisterField':
      return onRegisterField<T>(state, action)
    case 'Form/UnregisterField': {
      return onUnregisterField<T>(state, action)
    }
    default:
      return state
  }
}

export const getInitialState = <T extends Record<string, unknown>>(
  initialiseWith: Partial<FormState<T>> = {}
): FormState<T> =>
  ({
    isValidating: false,
    isSubmitting: false,
    values: {},
    fieldErrors: {},
    error: undefined,
    touched: {},
    mounted: {},
    removeValueOnUnmount: {},
    isDirty: false,
    isValid: true,
    fieldKeys: {},
    ...initialiseWith,
  } as FormState<T>)

export default FormReducer

function onUnregisterField<T extends Values>(
  state: FormState<T>,
  { payload: { key, fieldArrayKey, type } }: ActionType<ActionFactory<T>['UnregisterField']>
) {
  if (!state.mounted[key]) return state
  let values = state.values
  let mounted = state.mounted
  let removeValueOnUnmount = state.removeValueOnUnmount
  let fieldKeys = state.fieldKeys
  let keys = state.fieldKeys[key]
  if (keys?.includes(fieldArrayKey)) {
    keys = keys.filter((k) => k !== fieldArrayKey)
  }
  fieldKeys = keys !== state.fieldKeys[key] ? { ...fieldKeys, [key]: keys } : fieldKeys

  if (!keys?.length && state.removeValueOnUnmount[key]) {
    values = { ...values }
    mounted = { ...state.mounted }
    removeValueOnUnmount = { ...state.removeValueOnUnmount }
    delete values[key]
    delete mounted[key]
    delete removeValueOnUnmount[key]
    delete fieldKeys[key]
  }
  let value = values[key]
  if (typeof value !== 'undefined') {
    const index = state.fieldKeys[key]?.indexOf(fieldArrayKey) ?? -1
    if (type !== 'radio' && index >= 0) {
      const value_ = value as Array<any>
      const fieldArrayValue = value_[index]
      if (fieldArrayValue !== undefined) value = value_.filter((v) => v !== fieldArrayValue) as any
    } else if (index >= 0 && value === fieldArrayKey) {
      value = undefined as any
    }
  }

  return {
    ...state,
    values,
    fieldKeys,
    mounted,
    removeValueOnUnmount,
  }
}

function onRegisterField<T extends Values>(
  state: FormState<T>,
  { payload: { key, fieldArrayKey, type, removeValueOnUnmount: remove } }: ActionType<ActionFactory<T>['RegisterField']>
) {
  let value = state.values[key]
  if (typeof value === 'undefined') value = null as any
  const mounted = { ...state.mounted, [key]: true }
  const removeValueOnUnmount = {
    ...state.removeValueOnUnmount,
    [key]: remove,
  }
  // handle fieldArray
  let fieldKeys = state.fieldKeys
  const keyData = state.fieldKeys[key]?.find(({ key }) => key === fieldArrayKey)
  if (fieldArrayKey && !keyData) {
    const keys = [...(fieldKeys[key] ?? [])] as NonNullable<typeof fieldKeys[keyof T]>
    keys.push({ key: fieldArrayKey })
    fieldKeys = { ...state.fieldKeys, [key]: keys }
    if (!value && type !== 'radio') value = [] as any // radio buttons despite being a field Array do not produce multiple values
  }
  let values = state.values
  values = value !== values[key] ? { ...values, [key]: value } : values
  return { ...state, values, mounted, removeValueOnUnmount, fieldKeys }
}
