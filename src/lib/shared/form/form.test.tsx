/**
 * @jest-environment jsdom
 */
import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { promisify } from './utils'
import { useValidator } from './form'
import { firstValueFrom } from 'rxjs'
import FormReducer, { getInitialState, updateFieldKeys } from './reducer'
import { ActionFactory } from './actions'

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

      it('should correctly register a field array', () => {
        const dispatch = new ActionFactory<{ foo: string[] }>()
        let next = FormReducer<{ foo: string[] }>(
          getInitialState({ values: { foo: ['bab'] } }),
          dispatch.RegisterField({ key: 'foo', fieldArrayKey: 'baz' })
        )
        expect(next.mounted.foo).toBeTruthy()
        expect(next.values.foo).toEqual([])
        expect(next.fieldKeys.foo).toEqual([{ key: 'baz' }])
        // duplicate handling
        next = FormReducer<{ foo: string[] }>(next, dispatch.RegisterField({ key: 'foo', fieldArrayKey: 'baz' }))
        // multiple values handling
        expect(next.fieldKeys.foo).toEqual({ key: 'baz' })
        next = FormReducer<{ foo: string[] }>(next, dispatch.RegisterField({ key: 'foo', fieldArrayKey: 'bar' }))
        expect(next.fieldKeys.foo).toEqual([{ key: 'baz' }, { key: 'bar' }])
        // selected values handling
        next = FormReducer<{ foo: string[] }>(next, dispatch.RegisterField({ key: 'foo', fieldArrayKey: 'bab' }))
        expect(next.fieldKeys.foo).toEqual([{ key: 'baz' }, { key: 'bar' }, { key: 'bab', fieldValueIndex: 0 }])
      })

      it('should correctly register radio button array', () => {
        const dispatch = new ActionFactory<{ foo: string | null }>()
        let next = FormReducer<{ foo: string | null }>(
          getInitialState({ values: { foo: null } }),
          dispatch.RegisterField({ key: 'foo', type: 'radio', fieldArrayKey: 'baz' })
        )
        expect(next.mounted.foo).toBeTruthy()
        expect(next.values.foo).toEqual(null)
        expect(next.fieldKeys.foo).toEqual([{ key: 'baz' }])
        // duplicate handling
        next = FormReducer<{ foo: string[] }>(
          next,
          dispatch.RegisterField({ key: 'foo', type: 'radio', fieldArrayKey: 'baz' })
        )
        // multiple values handling
        expect(next.fieldKeys.foo).toEqual([{ key: 'baz' }])
        expect(next.values.foo).toEqual(null)
        next = FormReducer<{ foo: string[] }>(
          next,
          dispatch.RegisterField({ key: 'foo', type: 'radio', fieldArrayKey: 'bar' })
        )
        expect(next.values.foo).toEqual(null)
        expect(next.fieldKeys.foo).toEqual([{ key: 'baz' }, { key: 'bar' }])
        // selected values handling
        next = FormReducer<{ foo: string[] }>(next, dispatch.RegisterField({ key: 'foo', fieldArrayKey: 'bab' }))
        expect(next.fieldKeys.foo).toEqual([{ key: 'baz' }, { key: 'bar' }, { key: 'bab', fieldValueIndex: true }])
      })
    })

    describe('Unregister field', () => {
      describe('updateFieldKeys', () => {
        it('should update field keys correctly', () => {
          const initial = [{ key: 'bar', fieldValueIndex: 0 }, { key: 'bab' }, { key: 'baz', fieldValueIndex: 1 }]
          const result = updateFieldKeys(initial, 0)
          expect(result).toEqual([{ key: 'bab' }, { key: 'baz', fieldValueIndex: 0 }])
        })
      })
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

      it('should remove field array if it was mounted and all fields are de-registered', () => {
        const dispatch = new ActionFactory<{ foo: string[] }>()

        let next = FormReducer<{ foo: string[] }>(
          getInitialState({
            values: { foo: ['bar', 'baz'] },
            mounted: { foo: true },
            removeValueOnUnmount: { foo: true },
            fieldKeys: {
              foo: [{ key: 'bar', fieldValueIndex: 0 }, { key: 'bab' }, { key: 'baz', fieldValueIndex: 1 }],
            },
          }),
          dispatch.UnregisterField({ key: 'foo', fieldArrayKey: 'bar' })
        )
        expect(next.mounted.foo).toBeTruthy()
        expect(next.fieldKeys.foo).toEqual([{ key: 'bab' }, { key: 'baz', fieldValueIndex: 0 }])
        expect(next.values.foo).toEqual(['baz'])
        next = FormReducer<{ foo: string[] }>(next, dispatch.UnregisterField({ key: 'foo', fieldArrayKey: 'baz' }))
        expect(next.mounted.foo).toBeTruthy()
        expect(next.fieldKeys.foo).toEqual([{ key: 'bab' }])
        expect(next.values.foo).toEqual([])
        next = FormReducer<{ foo: string[] }>(next, dispatch.UnregisterField({ key: 'foo', fieldArrayKey: 'bab' }))
        expect(next.mounted.foo).toBe(undefined)
        expect(next.fieldKeys.foo).toBe(undefined)
        expect(next.removeValueOnUnmount.foo).toBe(undefined)
      })

      it('should remove radio button array if it was mounted and all fields are de-registered', () => {
        const dispatch = new ActionFactory<{ foo: string[] }>()

        let next = FormReducer<{ foo: string }>(
          getInitialState({
            values: { foo: 'bar' },
            mounted: { foo: true },
            removeValueOnUnmount: { foo: true },
            fieldKeys: {
              foo: [{ key: 'bar', fieldValueIndex: true }, { key: 'baz' }],
            },
          }),
          dispatch.UnregisterField({ key: 'foo', fieldArrayKey: 'baz', type: 'radio' })
        )
        expect(next.mounted.foo).toBeTruthy()
        expect(next.values.foo).toEqual('bar')
        expect(next.fieldKeys.foo).toEqual([{ key: 'bar', fieldValueIndex: true }])
        next = FormReducer<{ foo: string }>(
          next,
          dispatch.UnregisterField({ key: 'foo', type: 'radio', fieldArrayKey: 'bar' })
        )
        expect(next.values.foo).toBe(undefined)
        expect(next.mounted.foo).toBe(undefined)
        expect(next.fieldKeys.foo).toBe(undefined)
        expect(next.removeValueOnUnmount.foo).toBe(undefined)
      })
    })
    describe('Set Value', () => {
      it('should update the value', () => {
        const dispatch = new ActionFactory<{ foo: string }>()

        const next = FormReducer<{ foo: string }>(
          getInitialState({ values: { foo: '' }, mounted: { foo: true } }),
          dispatch.SetValue({ key: 'foo', value: 'bar' })
        )
        expect(next.values.foo).toBe('bar')
        expect(next.touched.foo).toBe(undefined)
        expect(next.isDirty).toBe(false)
      })
      it('should update the value and touched and isDirty state if internal flag is passed to the action ', () => {
        const dispatch = new ActionFactory<{ foo: string }>()

        const next = FormReducer<{ foo: string }>(
          getInitialState({ values: { foo: '' }, mounted: { foo: true } }),
          dispatch.SetValue({ key: 'foo', value: 'bar', internal: true })
        )
        expect(next.values.foo).toBe('bar')
        expect(next.touched.foo).toBe(true)
        expect(next.isDirty).toBe(true)
      })
    })
  })
})
