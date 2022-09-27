/**
 * @jest-environment jsdom
 */
import React, { MutableRefObject } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { promisify, promisifyFn } from './utils'
import { useValidator } from './use_form'
import { catchError, filter, firstValueFrom, from, merge, Observable, of, ReplaySubject, Subject } from 'rxjs'
import FormReducer, { getInitialState } from './reducer'
import { ActionFactory, ActionTypes, FormActions } from './actions'
import { Errors, FieldValidators, FormState, GlobalValidatorFn, Values } from './types'
import { getFormEffects, GetFormEffectsProps } from './side_effects'

describe('Form', () => {
  describe('Utils', () => {
    describe('promisify', () => {
      it('should wrap a non-promise value in a promise', () => {
        const value = 'value'
        const res = promisify(value)
        expect(res).toBeInstanceOf(Promise)
      })
      it('should return a promise value as is', () => {
        const value = Promise.resolve('value')
        const res = promisify(value)
        expect(res).toBe(value)
      })
    })

    describe('promisifyFn', () => {
      it('should catch synchronous errors correctly', async () => {
        const errorMsg = 'Fail'
        const thisWillThrow = (_: string) => {
          throw new Error(errorMsg)
        }
        const bound = thisWillThrow.bind(undefined, 'whatever')
        const result = promisifyFn(bound)
        expect(result).toBeInstanceOf(Promise)
        const err = await result.catch((e) => e)
        expect(err).toBeInstanceOf(Error)
        expect(err.message).toEqual(errorMsg)
      })
    })
  })
  describe('useValidator', () => {
    it('should return an empty validator if no global validator is provided', async () => {
      const { result } = renderHook(() => useValidator({}, {}))
      const res = await firstValueFrom(result.current({ foo: 'value' }))
      expect(res).toEqual({})
    })

    it('should return an empty validator, if global validator is empty', async () => {
      const { result } = renderHook(() => useValidator({}, {}, (_) => ({})))
      const res = await firstValueFrom(result.current({ foo: 'value' }))
      expect(res).toEqual({})
    })

    it('should return a valid validator out of global one provided (sync)', async () => {
      const { result } = renderHook(() => useValidator({}, {}, (_) => ({ foo: 'Error' })))
      const res = await firstValueFrom(result.current({ foo: 'value' }))
      expect(res.foo).toBe('Error')
    })

    it('should return a valid validator out of global one provided (async)', async () => {
      const { result } = renderHook(() =>
        useValidator({}, {}, (_) => new Promise((resolve) => setTimeout(() => resolve({ foo: 'Error' }), 33)))
      )
      const res = await firstValueFrom(result.current({ foo: 'value' }))
      expect(res.foo).toBe('Error')
    })

    it('should return a valid merged validator out of the global one and enabled field validators provided (async)', async () => {
      const values = { foo: 'value', baz: 2, bar: new Date('2019-09-09') }
      const { result } = renderHook(() =>
        useValidator<typeof values>(
          {
            foo: (value) => Promise.resolve(value.length > 4 ? 'Too long' : undefined),
            baz: (value) => Promise.resolve(value < 3 ? 'Too small' : undefined),
            bar: (_) => 'Error1',
          },
          {
            foo: true,
            baz: true,
          },
          (_) => new Promise((resolve) => setTimeout(() => resolve({ foo: 'Error', bar: 'Error2' }), 33))
        )
      )
      const res = await firstValueFrom(result.current(values))
      expect(res.foo).toBe('Too long')
      expect(res.bar).toBe('Error2')
      expect(res.baz).toBe('Too small')
    })
    it('should handle errors thrown in validators correctly', async () => {
      const errorMsg = 'Fail'
      const globalValidator: GlobalValidatorFn<{}> = () => {
        throw new Error(errorMsg)
      }
      const { result } = renderHook(() => useValidator({}, {}, globalValidator))

      const err = await firstValueFrom(result.current({}).pipe(catchError((e) => of(e as Error))))

      expect(err).toBeInstanceOf(Error)

      expect((err as Error)?.message).toBe(errorMsg)
    })
    it('should return a memoized function on re-render given identical input', () => {
      const values = { foo: 'value', baz: 2, bar: new Date('2019-09-09') }
      const fieldValidatorsInitial: FieldValidators<typeof values> = {
        foo: (value) => Promise.resolve(value.length > 4 ? 'Too long' : undefined),
        baz: (value) => Promise.resolve(value < 3 ? 'Too small' : undefined),
        bar: (_) => 'Error1',
      }
      const mountedInitial = {}
      const globalValidatorInitial: GlobalValidatorFn<typeof values> | undefined = (_) =>
        new Promise((resolve) => setTimeout(() => resolve({ foo: 'Error', bar: 'Error2' }), 33))

      const { result, rerender } = renderHook(
        ({ globalValidator, mounted }) => useValidator<typeof values>(fieldValidatorsInitial, mounted, globalValidator),
        { initialProps: { globalValidator: globalValidatorInitial, mounted: mountedInitial } }
      )
      const mountedTwo = {
        foo: true,
        baz: true,
      }
      rerender({ globalValidator: globalValidatorInitial, mounted: mountedTwo })

      expect(result.all[0] === result.all[1]).toBe(false)
      rerender({ globalValidator: globalValidatorInitial, mounted: mountedTwo })

      expect(result.all[1] === result.all[2]).toBe(true)
      // as any needed because the renderHook api strips undefined from provided initialProps
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rerender({ globalValidator: undefined as any, mounted: mountedTwo })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rerender({ globalValidator: undefined as any, mounted: mountedTwo })

      expect(result.all[4] === result.all[3]).toBe(true)
    })
  })
  describe('Reducer', () => {
    describe('Register Field', () => {
      it('should enable fields that are registered', () => {
        const dispatch = new ActionFactory<{ foo: string }>()
        let next = FormReducer<{ foo: string }>(getInitialState(), dispatch.RegisterField({ key: 'foo' }))
        expect(next.mounted.foo).toBeTruthy()
        next = FormReducer<{ foo: string }>(
          getInitialState({ values: { foo: 'bar' } }),
          dispatch.RegisterField({ key: 'foo', removeValueOnUnmount: true })
        )
        expect(next.mounted.foo).toBeTruthy()
        expect(next.removeValueOnUnmount.foo).toBeTruthy()
      })

      it('should initialise field value if it does not exist', () => {
        const dispatch = new ActionFactory<{ foo: string }>()
        const next = FormReducer<{ foo: string }>(getInitialState(), dispatch.RegisterField({ key: 'foo' }))
        expect(next.values.foo).toBe(null)
      })

      it('should not reset value if it already exists ', () => {
        const dispatch = new ActionFactory<{ foo: string }>()
        const next = FormReducer<{ foo: string }>(
          getInitialState({ values: { foo: '' } }),
          dispatch.RegisterField({ key: 'foo' })
        )
        expect(next.values.foo).toBe('')
      })

      describe('Unregister field', () => {
        it('should remove field value if it was mounted (aka registered) and the removeValueOnUnmount flag is set', () => {
          const dispatch = new ActionFactory<{ foo: string }>()
          let next = FormReducer<{ foo: string }>(
            getInitialState({ values: { foo: '' }, mounted: { foo: true } }),
            dispatch.UnregisterField({ key: 'foo' })
          )
          expect(next.values.foo).toBe('')
          expect(next.removeValueOnUnmount.foo).toBe(undefined)
          next = FormReducer<{ foo: string }>(
            getInitialState({ values: { foo: '' }, mounted: { foo: false } }),
            dispatch.UnregisterField({ key: 'foo' })
          )
          expect(next.values.foo).toBe('')
          expect(next.removeValueOnUnmount.foo).toBe(undefined)

          next = FormReducer<{ foo: string }>(
            getInitialState({ values: { foo: '' }, mounted: { foo: true }, removeValueOnUnmount: { foo: true } }),
            dispatch.UnregisterField({ key: 'foo' })
          )
          expect(next.values.foo).toBe(undefined)
          expect(next.removeValueOnUnmount.foo).toBe(undefined)
        })
      })
    })

    describe('SetDirty', () => {
      it('should set the dirty state correctly', () => {
        const dispatch = new ActionFactory<{ foo: string; bar: string }>()
        let next = FormReducer<{ foo: string }>(
          getInitialState({ values: { foo: '', bar: 'smth else' } }),
          dispatch.SetDirty(true)
        )
        expect(next.isDirty).toBe(true)
        expect(next.touched).toEqual({
          foo: true,
          bar: true,
        })
        next = FormReducer<{ foo: string }>(next, dispatch.SetDirty(false))
        expect(next.isDirty).toBe(false)
        expect(next.touched).toEqual({
          foo: false,
          bar: false,
        })
      })
    })
    describe('Submit', () => {
      it('should set the isSubmitting flag only when the form is valid', () => {
        const dispatch = new ActionFactory<{ foo: string; bar: string }>()
        let next = FormReducer<{ foo: string }>(
          getInitialState({ values: { foo: '', bar: 'smth else' }, fieldErrors: { foo: 'Required' }, isValid: false }),
          dispatch.Submit()
        )
        expect(next.isSubmitting).toBe(false)
        next = FormReducer<{ foo: string }>(next, dispatch.ValidateSuccess({}))
        next = FormReducer<{ foo: string }>(next, dispatch.Submit())
        expect(next.isSubmitting).toBe(true)
      })
    })
    describe('SubmitSuccess', () => {
      it('should set isSubmitting to false, update values and initialValues', () => {
        type FormValues = { foo: string; bar: string }
        const dispatch = new ActionFactory<FormValues>()
        const values: FormValues = { foo: 'whatever', bar: 'smth else' }
        const submitOutcome: FormValues = { foo: 'foo', bar: 'bar' }
        const next = FormReducer<FormValues>(
          getInitialState({ values, initialValues: values, fieldErrors: {}, isValid: true, isSubmitting: true }),
          dispatch.SubmitSuccess(submitOutcome)
        )
        expect(next.isSubmitting).toBe(false)
        expect(next.values).toEqual(submitOutcome)
        expect(next.initialValues).toEqual(submitOutcome)
      })
    })
    describe('Reset', () => {
      it('should set values to initialValues and reset all other state fields except for mounted to initial state', () => {
        type FormValues = { foo: string; bar: string }
        const dispatch = new ActionFactory<FormValues>()
        const values: FormValues = { foo: 'whatever', bar: 'smth else' }
        const initialValues: FormValues = { foo: 'foo', bar: 'bar' }
        const state = getInitialState({
          values,
          initialValues,
          fieldErrors: { foo: 'Error' },
          isValid: true,
          isDirty: true,
          mounted: { foo: true, bar: true },
        })
        const next = FormReducer<FormValues>(state, dispatch.Reset())
        const stateAfterReset = getInitialState({ values: initialValues, mounted: state.mounted, initialValues })
        expect(next).toEqual(stateAfterReset)
      })
    })
  })
  describe('SideEffects', () => {
    function setupSideEffects<T extends Values>(props: GetFormEffectsProps<T>) {
      const actions = new ActionFactory<T>()
      const ref: MutableRefObject<GetFormEffectsProps<T>> = {
        current: props,
      }
      const sideEffects = getFormEffects(actions, ref)
      const source$ = new ReplaySubject<[FormActions<T>, FormState<T>, FormState<T>]>(1)
      const sideEffects$ = merge(...sideEffects.map((effect) => effect(source$)))
      return { next: source$.next.bind(source$), sideEffects$, actions }
    }
    it(`should trigger Validate action if SetValue is received`, async () => {
      type FormValues = { foo: string; bar: string }
      const { next, sideEffects$, actions } = setupSideEffects<FormValues>({ onValidate: (_) => of({}) })
      const initialState = getInitialState({ values: { foo: '', bar: '' }, mounted: { foo: true, bar: true } })
      const action = actions.SetValue({ key: 'foo', value: 'new value' })
      next([action, initialState, FormReducer(initialState, action)])
      const nextAction = await firstValueFrom(sideEffects$)
      expect(nextAction.type).toBe(ActionTypes.Validate)
    })
    it(`should trigger ValidateSuccess action if Validate is received and validation does not throw`, async () => {
      type FormValues = { foo: string; bar: string }
      const { next, sideEffects$, actions } = setupSideEffects<FormValues>({ onValidate: (_) => of({}) })
      const initialState = getInitialState({
        values: { foo: '', bar: '' },
        mounted: { foo: true, bar: true },
      })
      const action = actions.Validate()
      next([action, initialState, FormReducer(initialState, action)])
      const nextAction = await firstValueFrom(sideEffects$)
      expect(nextAction.type).toBe(ActionTypes.ValidateSuccess)
      expect(nextAction.payload).toEqual({})
    })
    it(`should trigger ValidateError action if Validate is received and validation does throw`, async () => {
      type FormValues = { foo: string; bar: string }
      const errorMsg = 'Fail'
      const { next, sideEffects$, actions } = setupSideEffects<FormValues>({
        onValidate: (_) =>
          from(
            promisifyFn<Errors<{}>>(() => {
              throw new Error(errorMsg)
            }) as Promise<Errors<{}>>
          ),
      })
      const initialState = getInitialState({
        values: { foo: '', bar: '' },
        mounted: { foo: true, bar: true },
      })
      const action = actions.Validate()
      next([action, initialState, FormReducer(initialState, action)])
      const nextAction = await firstValueFrom(sideEffects$)
      expect(nextAction.type).toBe(ActionTypes.ValidateError)
      expect(nextAction.payload).toBeInstanceOf(Error)
      expect((nextAction.payload as Error).message).toBe('Fail')
    })
    it(`it should trigger Submit if SetValue is dispatched and the form is valid and dirty and autoSubmitFlag is on`, async () => {
      type FormValues = { foo: string; bar: string }
      const { next, sideEffects$, actions } = setupSideEffects<FormValues>({ onValidate: (_) => of({}) })
      const initialState = getInitialState({
        values: { foo: '', bar: '' },
        mounted: { foo: true, bar: true },
        isDirty: true,
        isValid: true,
        autoSubmit: true,
      })
      const action = actions.SetValue({ key: 'foo', value: 'new value' })
      next([action, initialState, FormReducer(initialState, action)])
      const nextAction = await firstValueFrom(sideEffects$.pipe(filter((action) => action.type === ActionTypes.Submit)))
      expect(nextAction.type).toBe(ActionTypes.Submit)
    })
    it(`should not call the onSubmit handler, if Submit is dispatched and the form is not valid`, async () => {
      jest.useFakeTimers('modern')
      type FormValues = { foo: string; bar: string }
      const submitOutcome: FormValues = { foo: 'foo', bar: 'bar' }
      const spy = jest.fn().mockReturnValue(Promise.resolve(submitOutcome))
      const { next, sideEffects$, actions } = setupSideEffects<FormValues>({
        onSubmit: spy,
        onValidate: (_) => of({}),
      })
      const initialState = getInitialState({
        values: { foo: '', bar: '' },
        mounted: { foo: true, bar: true },
        isValid: false,
      })
      const action = actions.Submit()
      next([action, initialState, FormReducer(initialState, action)])
      const sub = sideEffects$.subscribe()
      jest.runAllTimers()
      sub.unsubscribe()
      expect(spy.mock.calls.length).toEqual(0)
    })
    it(`should trigger SubmitSuccess action if Submit is received and handler does not throw`, async () => {
      type FormValues = { foo: string; bar: string }
      const submitOutcome: FormValues = { foo: 'foo', bar: 'bar' }
      const { next, sideEffects$, actions } = setupSideEffects<FormValues>({
        onSubmit: (_) => Promise.resolve(submitOutcome),
        onValidate: (_) => of({}),
      })
      const initialState = getInitialState({
        values: { foo: '', bar: '' },
        mounted: { foo: true, bar: true },
      })
      const action = actions.Submit()
      next([action, initialState, FormReducer(initialState, action)])
      const nextAction = await firstValueFrom(sideEffects$)
      expect(nextAction.type).toBe(ActionTypes.SubmitSuccess)
      expect(nextAction.payload).toEqual(submitOutcome)
    })
    it(`should trigger SubmitError action if Submit is received and handler does throw`, async () => {
      type FormValues = { foo: string; bar: string }
      const errorMsg = 'Fail'
      const { next, sideEffects$, actions } = setupSideEffects<FormValues>({
        onValidate: (_) => of({}),
        onSubmit: (_) =>
          promisifyFn<FormValues>(() => {
            throw new Error(errorMsg)
          }) as Promise<FormValues>,
      })
      const initialState = getInitialState({
        values: { foo: '', bar: '' },
        mounted: { foo: true, bar: true },
      })
      const action = actions.Submit()
      next([action, initialState, FormReducer(initialState, action)])
      const nextAction = await firstValueFrom(sideEffects$)
      expect(nextAction.type).toBe(ActionTypes.SubmitError)
      expect(nextAction.payload).toBeInstanceOf(Error)
      expect((nextAction.payload as Error).message).toBe('Fail')
    })
  })
})
