import { catchError, from, mergeMap, of, switchMap } from 'rxjs'
import { FormState, UseFormProps } from './form'
import { createActionCreator, isActionOf } from './store'
import { ActionType, Effect, Values } from './types'

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

  SetValues = createActionCreator(ActionTypes.SetValues)<T>()

  SetTouched = createActionCreator(ActionTypes.SetTouched)<{ key: keyof T; value: boolean }>()
}

export type FormActions<T extends Values> = ActionType<Actions<T>[keyof Actions<T>]>

export const getFormEffects = <T extends Values>(
  actions: Actions<T>,
  props: UseFormProps<T>
): Array<Effect<FormState<T>, FormActions<T>>> => [
  (stream$) =>
    stream$.pipe(
      isActionOf(actions.Submit),
      switchMap(([_, __, { values }]) => {
        return from(props.onSubmit(values)).pipe(
          mergeMap((values) => of(actions.SubmitSuccess(values))),
          catchError((err) => of(actions.SubmitError(err)))
        )
      })
    ),
  (stream$) =>
    stream$.pipe(
      isActionOf(actions.Validate),
      switchMap(([_, __, { values }]) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return from(props.onValidate!(values)).pipe(
          mergeMap((values) => of(actions.ValidateSuccess(values))),
          catchError((err) => of(actions.ValidateError(err)))
        )
      })
    ),
]
