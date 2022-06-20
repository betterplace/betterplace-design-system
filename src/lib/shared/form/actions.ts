import { catchError, debounceTime, delay, filter, from, mergeMap, Observable, of, switchMap } from 'rxjs'
import { createActionCreator, isActionOf } from '../store'
import { ActionType, Effect } from '../store/types'
import { Values, UseFormProps, FormState } from './types'

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

export class Actions<T extends Values> {
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

  RegisterField = createActionCreator(ActionTypes.RegisterField)<{ key: keyof T }>()
  UnregisterField = createActionCreator(ActionTypes.UnregisterField)<{ key: keyof T }>()
}

export type FormActions<T extends Values> = ActionType<Actions<T>[keyof Actions<T>]>
export type GetFormEffectsProps<T extends Values> = Omit<UseFormProps<T>, 'onValidate'> & {
  onValidate: (values: T) => Observable<{ [key in keyof T]?: string | undefined }>
}
export const getFormEffects = <T extends Values>(
  actions: Actions<T>,
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
