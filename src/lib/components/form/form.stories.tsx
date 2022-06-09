import React, { useCallback, useMemo } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FormProvider, useForm, useFormContext } from './form'
import { Values } from './types'
type MyFormValues = { foo: string }
const MyForm = (_: {}) => {
  const onSubmit = useCallback((values: MyFormValues) => {
    return new Promise<MyFormValues>((resolve) => {
      setTimeout(() => resolve(values), 1000)
    })
  }, [])
  const form = useForm<MyFormValues>({ onSubmit })
  return (
    <FormProvider {...form}>
      <form onSubmit={form.submit}>
        <MyField<MyFormValues> name="foo" />
        <input disabled={!form.isValid || form.isSubmitting} type="submit" value="Click me!" />
      </form>
    </FormProvider>
  )
}

const MyField_ = <T extends Values>({ name }: { name: keyof T }) => {
  const { register, getValue } = useFormContext<T>()
  const validate: (value: T[keyof T], values: T) => Promise<string | undefined> = useCallback(
    (value, _) =>
      new Promise((resolve) =>
        setTimeout(
          () => resolve(!value ? 'Required' : (value as unknown as string).length < 3 ? 'Too short' : undefined),
          300
        )
      ),
    []
  )
  const props = useMemo(() => register({ type: 'text', name, validate }), [name, register, validate])
  const value = useMemo(() => getValue({ type: 'text', name, validate }), [getValue, name, validate])
  console.log(value)
  return <input {...props} value={value} />
}

const MyField = React.memo(MyField_) as typeof MyField_

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
