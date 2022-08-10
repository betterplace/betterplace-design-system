/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FormProvider, useFieldProps, useForm } from './form'
import { Values, FieldValidatorFn, KeysMatching } from './types'
type MyFormValues = { foo: string; bar: Date; baz: boolean; faz: string }
const MyForm = (_: {}) => {
  const onSubmit = useCallback((values: MyFormValues) => {
    return new Promise<MyFormValues>((resolve) => {
      setTimeout(() => resolve(values), 1000)
    })
  }, [])
  const form = useForm<MyFormValues>({ onSubmit, initialValues: { foo: '', bar: new Date() } })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.submit} noValidate>
        <MyField<MyFormValues> name="foo" />
        <MyDateField<MyFormValues> name="bar" />
        <MyCheckboxField<MyFormValues> name="baz" />
        <MySelectField<MyFormValues> name="faz" />
        <input disabled={!form.isValid || form.isSubmitting} type="submit" value="Click me!" />
      </form>
    </FormProvider>
  )
}

const MyField = <T extends Values>({ name }: { name: keyof T }) => {
  const validate: FieldValidatorFn<T, keyof T> = useCallback(
    (value, _) =>
      new Promise((resolve) =>
        setTimeout(
          () => resolve(!value ? 'Required' : (value as unknown as string).length < 3 ? 'Too short' : undefined),
          300
        )
      ),
    []
  )
  const props = useFieldProps({ name, validate, type: 'text' })
  return <input {...props} />
}
const old = Date.now()

const MyDateField = <T extends Values>({ name }: { name: KeysMatching<T, Date> }) => {
  const validate: FieldValidatorFn<T, keyof T, Date> = useCallback(
    (value, _) =>
      new Promise((resolve) => setTimeout(() => resolve(value?.getTime() < old ? 'Invalid' : undefined), 300)),
    []
  )
  const props = useFieldProps<T, keyof T, string, Date>({
    name,
    validate,
    type: 'date',
    fromSource: (v) => (v ? new Date(v) : undefined),
    asSource: (v) => v?.toISOString().split('T')[0],
  })
  return <input {...props} />
}

const MyCheckboxField = <T extends Values>({ name }: { name: KeysMatching<T, boolean> }) => {
  const validate: FieldValidatorFn<T, keyof T, boolean> = useCallback(
    (value, _) => new Promise((resolve) => setTimeout(() => resolve(!value ? 'Required' : undefined), 300)),
    []
  )
  const props = useFieldProps<T, keyof T, string, boolean>({
    name,
    validate,
    type: 'checkbox',
  })

  return <input {...props} />
}

const MySelectField = <T extends Values>({ name }: { name: KeysMatching<T, string> }) => {
  const validate: FieldValidatorFn<T, keyof T, string> = useCallback(
    (value, _) => new Promise((resolve) => setTimeout(() => resolve(!value ? 'Required' : undefined), 300)),
    []
  )
  const props = useFieldProps<T, keyof T, string, string>({
    name,
    validate,
  })
  return (
    <select {...props}>
      <option label="A" value="aaa"></option>
      <option label="B" value="bbb"></option>
      <option label="C" value="ccc"></option>
    </select>
  )
}

// const MyMultipleCheckbox = <T extends Values>({ name }: { name: KeysMatching<T, string> }) => {

//   const { ref, onChange } = useFieldProps<T, keyof T, string[], string[]>({
//     name,
//     fromSource: () =>
//   })
//   return (
//     <fieldset onChange={onChange} ref={ref}>
//       <input name={name} value="A" type="checkbox" />
//       <input name={name} value="B" type="checkbox" />
//       <input name={name} value="C" type="checkbox" />
//     </fieldset>
//   )
// }

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Lib/Form',
  component: MyForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {},
} as ComponentMeta<typeof MyForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MyForm> = (args) => <MyForm {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
