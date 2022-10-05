import React, { ChangeEventHandler, useCallback, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useForm } from './use_form'
import { Values, FieldValidatorFn, KeysMatching } from './types'
import { JSONPrettyPrint } from '../../components'
import { FormProvider } from './form_context'
import useFieldProps from './use_field_props/use_field_props'
type FormValues = {
  input2: string
  input1: string
  date: Date
  toggleInput1: boolean
  faz: string
  autoSubmit: boolean
}
const FormWithProvider = (_: {}) => {
  const [showField, setShowField] = useState(true)
  const onSubmit = useCallback((values: FormValues) => {
    return new Promise<FormValues>((resolve) => {
      setTimeout(() => resolve(values), 2000)
    })
  }, [])
  const form = useForm<FormValues>({ onSubmit, initialValues: { input2: '', input1: '' } })
  const { isSubmitting } = form
  return (
    <FormProvider {...form}>
      <form onSubmit={form.submit} noValidate>
        <CheckboxField<FormValues> name="toggleInput1" onChange={(evt) => setShowField(!evt.target.checked)} />
        {showField && <Field<FormValues> name="input1" />}
        <Field<FormValues> name="input2" />
        <DateField<FormValues> name="date" />
        <SelectField<FormValues> name="faz" />
        <SubmitButton isSubmitting={isSubmitting} />
        <CheckboxField<FormValues> name="autoSubmit" onChange={(evt) => form.setAutoSubmit(evt.target.checked)} />
        <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
          <strong>Form state:</strong>
          <JSONPrettyPrint json={form} />
        </div>
      </form>
    </FormProvider>
  )
}

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return <input type="submit" value={isSubmitting ? 'Submitting...' : 'Submit'} />
}

const Field = <T extends Values>({
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
  const props = useFieldProps({ name, validate: validate, type: 'text', removeValueOnUnmount })
  return (
    <div style={{ marginBottom: '5px' }}>
      <label htmlFor={props.name} style={{ marginRight: '5px' }}>
        {name}
      </label>
      <input {...props} id={props.name} />
    </div>
  )
}
const old = new Date().getTime()

const DateField = <T extends Values>({ name }: { name: KeysMatching<T, Date> }) => {
  const validate: FieldValidatorFn<T, keyof T, Date> = useCallback(
    (value, _) =>
      new Promise((resolve) => setTimeout(() => resolve((value?.getTime() ?? 0) < old ? 'Invalid' : undefined), 300)),
    []
  )
  const props = useFieldProps<T, keyof T, string, Date>({
    name,
    validate: validate,
    type: 'date',
    parse: (v) => (v ? new Date(v) : undefined),
    format: (v) => v?.toISOString().split('T')[0] ?? '',
  })
  return (
    <div style={{ marginBottom: '5px' }}>
      <label htmlFor={props.name} style={{ marginRight: '5px' }}>
        {name}
      </label>
      <input {...props} id={props.name} />
    </div>
  )
}

const CheckboxField = <T extends Values>({
  name,
  onChange,
  required,
}: {
  name: KeysMatching<T, boolean>
  onChange?: ChangeEventHandler<HTMLInputElement>
  required?: boolean
}) => {
  const validate: FieldValidatorFn<T, keyof T, boolean> = useCallback(
    (value, _) => new Promise((resolve) => setTimeout(() => resolve(required && !value ? 'Required' : undefined), 300)),
    [required]
  )
  const props = useFieldProps<T, keyof T, string, boolean>({
    name,
    validate: validate,
    type: 'checkbox',
    onChange,
  })

  return (
    <div style={{ marginBottom: '5px' }}>
      <input {...props} id={props.name} />
      <label htmlFor={props.name} style={{ marginLeft: '5px' }}>
        {name}
      </label>
    </div>
  )
}

const SelectField = <T extends Values>({ name }: { name: KeysMatching<T, string> }) => {
  const validate: FieldValidatorFn<T, keyof T, string> = useCallback(
    (value, _) => new Promise((resolve) => setTimeout(() => resolve(!value ? 'Required' : undefined), 300)),
    []
  )
  const props = useFieldProps<T, keyof T, string, string>({
    name,
    validate: validate,
  })
  return (
    <div style={{ marginBottom: '5px' }}>
      <label htmlFor={name} style={{ marginRight: '5px' }}>
        {name}
      </label>
      <select {...props} id={name}>
        <option> -- select an option -- </option>
        <option label="A" value="aaa"></option>
        <option label="B" value="bbb"></option>
        <option label="C" value="ccc"></option>
      </select>
    </div>
  )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Hooks/Form/Form with provider',
  component: FormWithProvider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FormWithProvider>

const Template: ComponentStory<typeof FormWithProvider> = (args) => <FormWithProvider {...args} />

export const Example = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Example.args = {}
