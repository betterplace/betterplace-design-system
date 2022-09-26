import { ActionType } from '../store/types'
import { ActionFactory, FormActions } from './actions'
import { Values, FormState } from './types'

const FormReducer = <T extends Values>(state: FormState<T>, action: FormActions<T>): FormState<T> => {
  switch (action.type) {
    case 'Form/Submit':
      return { ...state, isSubmitting: state.isValid, error: undefined }
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
    case 'Form/SetDirty':
      return onSetDirty<T>(state, action)
    case 'Form/SetAutoSubmit':
      return {
        ...state,
        autoSubmit: action.payload,
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
    isValid: true,
    isDirty: false,
    isValidating: false,
    isSubmitting: false,
    values: {},
    fieldErrors: {},
    error: undefined,
    touched: {},
    mounted: {},
    removeValueOnUnmount: {},
    fieldKeys: {},
    ...initialiseWith,
  } as FormState<T>)

export default FormReducer

function onSetDirty<T extends Values>(
  state: FormState<T>,
  { payload: isDirty }: ActionType<ActionFactory<T>['SetDirty']>
): FormState<T> {
  const fieldNames = Object.keys(state.values) as Extract<keyof T, string>[]
  const touched = Object.fromEntries(fieldNames.map((fieldName) => [fieldName, isDirty])) as FormState<T>['touched']

  return {
    ...state,
    touched,
    isDirty,
  }
}

function onUnregisterField<T extends Values>(
  state: FormState<T>,
  { payload: { key } }: ActionType<ActionFactory<T>['UnregisterField']>
) {
  if (!state.mounted[key]) return state
  let values = state.values
  let mounted = state.mounted
  let removeValueOnUnmount = state.removeValueOnUnmount

  if (state.removeValueOnUnmount[key]) {
    values = { ...values }
    mounted = { ...state.mounted }
    removeValueOnUnmount = { ...state.removeValueOnUnmount }
    delete values[key]
    delete mounted[key]
    delete removeValueOnUnmount[key]
  }
  return {
    ...state,
    values,
    mounted,
    removeValueOnUnmount,
  }
}

function onRegisterField<T extends Values>(
  state: FormState<T>,
  { payload: { key, removeValueOnUnmount: remove } }: ActionType<ActionFactory<T>['RegisterField']>
) {
  let value = state.values[key]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof value === 'undefined') value = null as any
  const mounted = { ...state.mounted, [key]: true }
  const removeValueOnUnmount = {
    ...state.removeValueOnUnmount,
    [key]: remove,
  }
  let values = state.values
  values = value !== values[key] ? { ...values, [key]: value } : values
  return { ...state, values, mounted, removeValueOnUnmount }
}
