import { HTMLInputTypeAttribute } from 'react'
import { createActionCreator } from '../store'
import { ActionType } from '../store/types'
import { Values } from './types'

export const ActionTypes = {
  Submit: 'Form/Submit',
  SubmitSuccess: 'Form/SubmitSuccess',
  SubmitError: 'Form/SubmitError',
  Validate: 'Form/Validate',
  ValidateSuccess: 'Form/ValidateSuccess',
  ValidateError: 'Form/ValidateError',
  Reset: 'Form/Reset',
  SetValue: 'Form/SetValue',
  SetValues: 'Form/SetValues',
  SetAutoSubmit: 'Form/SetAutoSubmit',
  SetTouched: 'Form/SetTouched',
  SetDirty: 'Form/SetDirty',
  RegisterField: 'Form/RegisterField',
  UnregisterField: 'Form/UnregisterField',
} as const

export class ActionFactory<T extends Values> {
  Submit = createActionCreator(ActionTypes.Submit)<void>()
  SubmitSuccess = createActionCreator(ActionTypes.SubmitSuccess)<T>()

  SubmitError = createActionCreator(ActionTypes.SubmitError)<Error>()

  Validate = createActionCreator(ActionTypes.Validate)<void>()

  ValidateSuccess = createActionCreator(ActionTypes.ValidateSuccess)<{ [key in keyof T]?: string }>()

  ValidateError = createActionCreator(ActionTypes.ValidateError)<Error>()

  Reset = createActionCreator(ActionTypes.Reset)<void>()

  SetAutoSubmit = createActionCreator(ActionTypes.SetAutoSubmit)<boolean | undefined>()

  SetDirty = createActionCreator(ActionTypes.SetDirty)<boolean>()
  SetValue = createActionCreator(ActionTypes.SetValue)<{ key: keyof T; value: T[keyof T]; internal?: boolean }>()

  SetValues = createActionCreator(ActionTypes.SetValues)<Partial<T>>()

  SetTouched = createActionCreator(ActionTypes.SetTouched)<{ key: keyof T; touched: boolean }>()

  RegisterField = createActionCreator(ActionTypes.RegisterField)<{
    key: keyof T
    removeValueOnUnmount?: boolean
    type?: HTMLInputTypeAttribute
  }>()
  UnregisterField = createActionCreator(ActionTypes.UnregisterField)<{ key: keyof T; type?: HTMLInputTypeAttribute }>()
}
export type FormActions<T extends Values> = ActionType<ActionFactory<T>[keyof ActionFactory<T>]>

export type ActionDispatch<T extends Values> = (value: FormActions<T>) => void
