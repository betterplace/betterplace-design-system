/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormActions } from './actions'
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
        dirty: false,
      }
    case 'Form/SetValue':
      return {
        ...state,
        values: { ...state.values, [action.payload.key]: action.payload.value },
        touched: {
          ...state.touched,
          [action.payload.key]: action.payload.internal && action.payload.value !== state.values[action.payload.key],
        },
        dirty: (action.payload.internal && action.payload.value !== state.values[action.payload.key]) || state.dirty,
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
        dirty: action.payload.touched || state.dirty,
      }
    case 'Form/RegisterField': {
      const value = state.values[action.payload.key]
      const enabled = { ...state.enabled, [action.payload.key]: true }
      if (typeof value !== 'undefined') return state
      const values = { ...state.values, [action.payload.key]: null }
      return { ...state, values, enabled }
    }
    case 'Form/UnregisterField': {
      const values = { ...state.values }
      const enabled = { ...state.enabled, [action.payload.key]: false }

      delete values[action.payload.key]
      return {
        ...state,
        values,
        enabled,
      }
    }
    default:
      return state
  }
}

export const getInitialState = <T extends Record<string, unknown>>(
  initialiseWith: Partial<FormState<T>> = {}
): FormState<T> => ({
  isValidating: false,
  isSubmitting: false,
  values: {} as any,
  fieldErrors: {} as any,
  error: undefined,
  touched: {} as any,
  enabled: {} as any,
  dirty: false,
  isValid: true,
  ...initialiseWith,
})

export default FormReducer
