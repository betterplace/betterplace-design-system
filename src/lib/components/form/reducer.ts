/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormActions } from './actions'
import { FormState } from './form'
import { Values } from './types'

const FormReducer = <T extends Values>(state: FormState<T>, action: FormActions<T>): FormState<T> => {
  switch (action.type) {
    case 'Form/Submit':
      return { ...state, isSubmitting: true, generalError: undefined }
    case 'Form/SubmitError':
      return {
        ...state,
        isSubmitting: false,
        generalError: action.payload,
      }
    case 'Form/SubmitSuccess':
    case 'Form/SetValues':
      return {
        ...state,
        isSubmitting: false,
        generalError: undefined,
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
        generalError: undefined,
        errors: {},
      }
    case 'Form/ValidateSuccess':
      return {
        ...state,
        isValidating: false,
        generalError: undefined,
        errors: action.payload,
        isValid: !!Object.keys(action.payload).length,
      }
    case 'Form/ValidateError':
      return {
        ...state,
        isValidating: false,
        generalError: action.payload,
      }
    case 'Form/SetTouched':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.key]: action.payload.value,
        },
        dirty: action.payload.value || state.dirty,
      }
    default:
      return state
  }
}

export const getInitialState = <T extends Record<string, unknown>>(): FormState<T> => ({
  isValidating: false,
  isSubmitting: false,
  values: {} as any,
  errors: {} as any,
  generalError: undefined,
  touched: {} as any,
  dirty: false,
  isValid: true,
})

export default FormReducer
