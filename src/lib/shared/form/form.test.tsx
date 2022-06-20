/**
 * @jest-environment jsdom
 */
import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import '@testing-library/jest-dom'
import { promisify } from './utils'
import { useValidator } from './form'
import { firstValueFrom } from 'rxjs'

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
        expect(res === value).toBeTruthy()
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
})
