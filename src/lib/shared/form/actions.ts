import { HTMLInputTypeAttribute } from 'react'
import { catchError, debounceTime, delay, filter, from, mergeMap, Observable, of, switchMap, tap } from 'rxjs'
import { createActionCreator, isActionOf } from '../store'
import { ActionType, Effect } from '../store/types'
import { Values, UseFormProps, FormState, UnpackArr } from './types'

const ActionTypes = {
  Submit: 'Form/Submit',
  SubmitSuccess: 'Form/SubmitSuccess',
  SubmitError: 'Form/SubmitError',
  Validate: 'Form/Validate',
  ValidateSuccess: 'Form/ValidateSuccess',
  ValidateError: 'Form/ValidateError',
  Reset: 'Form/Reset',
  SetValue: 'Form/SetValue',
  SetValues: 'Form/SetValues',
  SetTouched: 'Form/SetTouched',
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

  SetValue = createActionCreator(ActionTypes.SetValue)<{ key: keyof T; value: T[keyof T]; internal?: boolean }>()

  SetValues = createActionCreator(ActionTypes.SetValues)<Partial<T>>()

  SetTouched = createActionCreator(ActionTypes.SetTouched)<{ key: keyof T; touched: boolean }>()

  RegisterField = createActionCreator(ActionTypes.RegisterField)<{
    key: keyof T
    type?: HTMLInputTypeAttribute
    removeValueOnUnmount?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fieldArrayKey?: any
  }>()
  UnregisterField = createActionCreator(ActionTypes.UnregisterField)<{
    key: keyof T
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fieldArrayKey?: any
    type?: HTMLInputTypeAttribute
  }>()
}

export type FormActions<T extends Values> = ActionType<ActionFactory<T>[keyof ActionFactory<T>]>
export type ActionDispatch<T extends Values> = (value: FormActions<T>) => void

export type GetFormEffectsProps<T extends Values> = Omit<UseFormProps<T>, 'onValidate'> & {
  onValidate: (values: T) => Observable<{ [key in keyof T]?: string | undefined }>
}
export const getFormEffects = <T extends Values>(
  actions: ActionFactory<T>,
  propsRef: React.RefObject<GetFormEffectsProps<T>>
): Array<Effect<FormState<T>, FormActions<T>>> => [
  (action$) =>
    action$.pipe(
      filter(() => typeof propsRef.current?.onSubmit === 'function'),
      isActionOf(actions.Submit),
      switchMap(([_, __, { values }]) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return from(propsRef.current!.onSubmit!(values)).pipe(
          mergeMap((values) => of(actions.SubmitSuccess(values))),
          catchError((err) => of(actions.SubmitError(err)))
        )
      })
    ),
  (action$) =>
    action$.pipe(
      isActionOf(actions.Validate),
      switchMap(([_, __, { values }]) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return from(propsRef.current!.onValidate!(values)).pipe(
          tap((values) => console.log('errors', values)),
          mergeMap((values) => of(actions.ValidateSuccess(values))),
          catchError((err) => of(actions.ValidateError(err)))
        )
      })
    ),
  (action$) =>
    action$.pipe(
      isActionOf(actions.SetValue),
      debounceTime(33),
      delay(33),
      switchMap((_) => of(actions.Validate(undefined)))
    ),
  (action$) =>
    action$.pipe(
      isActionOf(actions.RegisterField),
      debounceTime(33),
      delay(33),
      switchMap((_) => of(actions.Validate(undefined)))
    ),
]
