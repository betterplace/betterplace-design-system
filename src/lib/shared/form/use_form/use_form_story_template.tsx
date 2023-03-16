import { ComponentStory } from '@storybook/react'
import React from 'react'
import { HookRenderHelper } from '../../../../helpers'
import { JSONPrettyPrint } from '../../../../lib'
import { UseFormProps, Values } from '../types'
import { useForm } from './use_form'
type Unhooked = <T extends Values>(props: UseFormProps<T>) => JSX.Element
export const Template: ComponentStory<Unhooked> = (args) => {
  const form = useForm(args)
  return (
    <HookRenderHelper>
      <JSONPrettyPrint json={form} />
      <button onClick={form.submit}>useForm.submit</button>
      <button onClick={form.validate}>useForm.validate</button>
      <button onClick={form.reset}>useForm.reset</button>
      <button onClick={form.setValue.bind(undefined, 'foo', String(Math.round(Math.random() * 100)))}>
        useForm.setValue
      </button>
      <button onClick={form.setValues.bind(undefined, { foo: 'bar', baz: true })}>useForm.setValues</button>
      <button onClick={form.setDirty.bind(undefined, !form.isDirty)}>useForm.setDirty</button>
      <button onClick={form.setTouched.bind(undefined, 'foo', !form.isDirty)}>useForm.setTouched</button>
    </HookRenderHelper>
  )
}
