import { RefObject } from 'react'
import {
  Observable,
  filter,
  debounceTime,
  switchMap,
  map,
  take,
  mergeMap,
  of,
  from,
  catchError,
  delay,
  EMPTY,
} from 'rxjs'
import { Effect, isActionOf } from '../store'
import { ActionFactory, FormActions } from './actions'
import { Values, UseFormProps, FormState, ObservableValidatorFn } from './types'

export type GetFormEffectsProps<T extends Values> = Omit<UseFormProps<T>, 'onValidate'> & {
  onValidate: ObservableValidatorFn<T>
}

export const getFormEffects = <T extends Values>(
  actions: ActionFactory<T>,
  propsRef: RefObject<GetFormEffectsProps<T>>
): Array<Effect<FormState<T>, FormActions<T>>> => [
  (action$) =>
    action$.pipe(
      filter(([_, __, { autoSubmit }]) => !!autoSubmit),
      isActionOf([actions.SetValues, actions.SetValue]),
      debounceTime(300),
      switchMap(() =>
        action$
          .pipe(
            map(
              ([_, __, { isValid, isDirty, isValidating, isSubmitting }]) =>
                isValid && isDirty && !isValidating && !isSubmitting
            ),
            filter(Boolean),
            take(1)
          )
          .pipe(mergeMap(() => of(actions.Submit())))
      )
    ),
  (action$) =>
    action$.pipe(
      filter(() => typeof propsRef.current?.onSubmit === 'function'),
      isActionOf(actions.Submit),
      switchMap(([_, __, { values, isValid }]) => {
        if (!isValid) return EMPTY
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
      debounceTime(33),
      switchMap(([_, __, { values }]) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return from(propsRef.current!.onValidate(values)).pipe(
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
      switchMap(() => of(actions.Validate()))
    ),
  (action$) =>
    action$.pipe(
      isActionOf(actions.RegisterField),
      debounceTime(33),
      delay(33),
      switchMap(() => of(actions.Validate()))
    ),
]
