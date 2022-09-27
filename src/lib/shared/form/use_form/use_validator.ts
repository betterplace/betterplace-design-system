import { useMemo, useCallback } from 'react'
import { from, map, forkJoin } from 'rxjs'
import {
  Values,
  GlobalValidatorFn,
  Errors,
  ObservableValidatorFn,
  FieldValidators,
  FieldsEnabled,
  FieldValidatorFn,
} from '../types'
import { promisifyFn } from '../utils'
function mergeErrors<V extends Values, T extends Record<keyof V, unknown>>(source: T, target: T): T {
  const res = { ...target }
  Object.entries(source).forEach(([key, error]) => {
    const k = key as keyof T
    if (res[k] !== undefined && res[k] !== null) return
    res[k] = error as T[keyof T]
  })
  return res
}

// Dummy validator for function stability
const noopGlobalValidator = <T extends Values>(_: T) => ({})

/**
 * Function merges individual field validators with global one
 * and returns a global validator returning an Observable of {Errors<T>}
 * @param {FieldValidators<T>} fieldValidators
 * @param {FieldsEnabled<T>} fieldEnabled
 * @param {GlobalValidatorFn<T> | undefined} [globalValidator]
 * @returns {ObservableValidatorFn<T>}
 */
export function useValidator<T extends Values>(
  fieldValidators: FieldValidators<T>,
  fieldEnabled: FieldsEnabled<T>,
  globalValidator: GlobalValidatorFn<T> | undefined = noopGlobalValidator
): ObservableValidatorFn<T> {
  const validators: Array<ObservableValidatorFn<T>> = useMemo(() => {
    const mappedFieldValidators = Object.entries(fieldValidators)
      .filter(([key]) => fieldEnabled[key])
      .map(([key, fn]: [keyof T, FieldValidatorFn<T, keyof T> | undefined]) => (values: T) => {
        const bound = fn?.bind(undefined, values[key], values)
        return from(promisifyFn(bound).then((res) => ({ [key as keyof T]: res } as Errors<T>)))
      })
    mappedFieldValidators.push((values: T) =>
      from(promisifyFn(globalValidator.bind(undefined, values)).then((v) => v ?? {}))
    )

    return mappedFieldValidators
  }, [fieldValidators, fieldEnabled, globalValidator])
  const validator: ObservableValidatorFn<T> = useCallback(
    (values) => {
      return forkJoin(validators.map((fn) => fn(values))).pipe(
        map((errors) => errors.reduce((agg, errors) => mergeErrors(errors, agg), {} as Errors<T>))
      )
    },
    [validators]
  )
  return validator
}
