import React, { useCallback, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FormProvider, useFieldProps, useForm } from './form'
import { Values, FieldValidatorFn, KeysMatching } from './types'
import { JSONPrettyPrint } from '../../components'
type MyFormValues = { foo: string; bar: Date; baz: boolean; faz: string; sus: string; autoSubmit: boolean }

const MyForm = (_: {}) => {
  const [showField, setShowField] = useState(true)
  const onSubmit = useCallback((values: MyFormValues) => {
    return new Promise<MyFormValues>((resolve) => {
      setTimeout(() => resolve(values), 2000)
    })
  }, [])
  const form = useForm<MyFormValues>({ onSubmit, initialValues: { foo: '', sus: '' } })
  const { isSubmitting, isValid, isDirty } = form
  return (
    <FormProvider {...form}>
      <form onSubmit={form.submit} noValidate>
        {showField && <MyField<MyFormValues> name="sus" />}
        <MyField<MyFormValues> name="foo" />
        <MyDateField<MyFormValues> name="bar" />
        <MyCheckboxField<MyFormValues> name="baz" onChange={(evt) => setShowField(!evt.target.checked)} />
        <MyCheckboxField<MyFormValues> name="autoSubmit" onChange={(evt) => form.setAutoSubmit(evt.target.checked)} />

        <MySelectField<MyFormValues> name="faz" />
        <SubmitButton isSubmitting={isSubmitting} isDirty={isDirty} isValid={isValid} />
        <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
          <strong>Form state:</strong>
          <JSONPrettyPrint json={form} />
        </div>
      </form>
    </FormProvider>
  )
}

const SubmitButton = ({
  isSubmitting,
  isValid,
  isDirty,
}: {
  isSubmitting: boolean
  isValid: boolean
  isDirty: boolean
}) => {
  return (
    <input
      style={{ borderColor: isValid || !isDirty ? 'inherit' : 'red' }}
      type="submit"
      value={isSubmitting ? 'Submitting...' : 'Submit'}
    />
  )
}

const MyField = <T extends Values>({
  name,
  removeValueOnUnmount,
}: {
  name: Extract<keyof T, string>
  removeValueOnUnmount?: boolean
}) => {
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
  const props = useFieldProps({ name, onValidate: validate, type: 'text', removeValueOnUnmount })
  return (
    <label style={{ display: 'block', marginBottom: '5px' }}>
      <span style={{ marginRight: '5px' }}>{name}</span>
      <input {...props} />
    </label>
  )
}
const old = new Date().getTime()

const MyDateField = <T extends Values>({ name }: { name: KeysMatching<T, Date> }) => {
  const validate: FieldValidatorFn<T, keyof T, Date> = useCallback(
    (value, _) =>
      new Promise((resolve) => setTimeout(() => resolve((value?.getTime() ?? 0) < old ? 'Invalid' : undefined), 300)),
    []
  )
  const props = useFieldProps<T, keyof T, string, Date>({
    name,
    onValidate: validate,
    type: 'date',
    parse: (v) => (v ? new Date(v) : undefined),
    format: (v) => v?.toISOString().split('T')[0] ?? '',
  })
  return (
    <label style={{ display: 'block', marginBottom: '5px' }}>
      <span style={{ marginRight: '5px' }}>{name}</span>
      <input {...props} />
    </label>
  )
}

const MyCheckboxField = <T extends Values>({
  name,
  onChange,
  required,
}: {
  name: KeysMatching<T, boolean>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  required?: boolean
}) => {
  const validate: FieldValidatorFn<T, keyof T, boolean> = useCallback(
    (value, _) => new Promise((resolve) => setTimeout(() => resolve(required && !value ? 'Required' : undefined), 300)),
    [required]
  )
  const props = useFieldProps<T, keyof T, string, boolean>({
    name,
    onValidate: validate,
    type: 'checkbox',
    onChange,
  })

  return (
    <label style={{ display: 'block', marginBottom: '5px' }}>
      <span style={{ marginRight: '5px' }}>{name}</span>
      <input {...props} />
    </label>
  )
}

const MySelectField = <T extends Values>({ name }: { name: KeysMatching<T, string> }) => {
  const validate: FieldValidatorFn<T, keyof T, string> = useCallback(
    (value, _) => new Promise((resolve) => setTimeout(() => resolve(!value ? 'Required' : undefined), 300)),
    []
  )
  const props = useFieldProps<T, keyof T, string, string>({
    name,
    onValidate: validate,
  })
  return (
    <label style={{ display: 'block', marginBottom: '5px' }}>
      <span style={{ marginRight: '5px' }}>{name}</span>
      <select {...props}>
        <option> -- select an option -- </option>
        <option label="A" value="aaa"></option>
        <option label="B" value="bbb"></option>
        <option label="C" value="ccc"></option>
      </select>
    </label>
  )
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
