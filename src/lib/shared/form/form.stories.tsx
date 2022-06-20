import React, { useCallback } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FormProvider, useFieldProps, useForm } from './form'
import { Values, FieldValidatorFn } from './types'
type MyFormValues = { foo: string; bar: Date }
const MyForm = (_: {}) => {
  const onSubmit = useCallback((values: MyFormValues) => {
    return new Promise<MyFormValues>((resolve) => {
      setTimeout(() => resolve(values), 1000)
    })
  }, [])
  const form = useForm<MyFormValues>({ onSubmit, initialValues: { foo: '', bar: new Date() } })
  return (
    <FormProvider {...form}>
      <form onSubmit={form.submit}>
        <MyField<MyFormValues> name="foo" />
        <MyDateField<MyFormValues> name="bar" />
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

const MyDateField = <T extends Values>({ name }: { name: keyof T }) => {
  const validate: FieldValidatorFn<T, keyof T> = useCallback(
    (value, _) =>
      new Promise((resolve) =>
        setTimeout(() => resolve((value as Date).getMilliseconds() < 1000000 ? 'Invalid' : undefined), 300)
      ),
    []
  )
  const props = useFieldProps<T>({
    name,
    validate,
    type: 'date',
    fromString: (v) => new Date(v) as any,
    asString: (v: any) => v?.toISOString(),
  })
  return <input {...props} />
}

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
