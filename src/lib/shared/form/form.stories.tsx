import React, { ChangeEventHandler, useCallback, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useForm } from './use_form'
import { Values, FieldValidatorFn, KeysMatching } from './types'
import { JSONPrettyPrint } from '../../components'
import { FormProvider } from './form_context'
import useFieldProps from './use_field_props/use_field_props'
type SimpleFormValues = { input2: string; input1: string }
type ComplexFormValues = SimpleFormValues & { date: Date; toggleInput1: boolean; faz: string; autoSubmit: boolean }
const ComplexForm = (_: {}) => {
  const [showField, setShowField] = useState(true)
  const onSubmit = useCallback((values: ComplexFormValues) => {
    return new Promise<ComplexFormValues>((resolve) => {
      setTimeout(() => resolve(values), 2000)
    })
  }, [])
  const form = useForm<ComplexFormValues>({ onSubmit, initialValues: { input2: '', input1: '' } })
  const { isSubmitting, isValid, isDirty } = form
  return (
    <FormProvider {...form}>
      <form onSubmit={form.submit} noValidate>
        <CheckboxField<ComplexFormValues> name="toggleInput1" onChange={(evt) => setShowField(!evt.target.checked)} />
        {showField && <Field<ComplexFormValues> name="input1" />}
        <Field<ComplexFormValues> name="input2" />
        <DateField<ComplexFormValues> name="date" />
        <SelectField<ComplexFormValues> name="faz" />
        <SubmitButton isSubmitting={isSubmitting} isDirty={isDirty} isValid={isValid} />
        <CheckboxField<ComplexFormValues>
          name="autoSubmit"
          onChange={(evt) => form.setAutoSubmit(evt.target.checked)}
        />
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
      <input {...props} />
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
      <input {...props} />
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
      <input {...props} />
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
      <select {...props}>
        <option> -- select an option -- </option>
        <option label="A" value="aaa"></option>
        <option label="B" value="bbb"></option>
        <option label="C" value="ccc"></option>
      </select>
    </div>
  )
}

const SimpleForm = (_: {}) => {
  const onSubmit = useCallback((values: SimpleFormValues) => {
    return new Promise<SimpleFormValues>((resolve) => {
      setTimeout(() => resolve(values), 1000)
    })
  }, [])
  const form = useForm<SimpleFormValues>({ onSubmit, initialValues: { input2: '', input1: '' } })
  const { submit, register, isValid, isDirty, isSubmitting } = form
  return (
    <>
      <form onSubmit={submit} noValidate>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="input1" style={{ marginRight: '5px' }}>
            input1
          </label>
          <input {...register({ name: 'input1', type: 'text' })} />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="input2" style={{ marginRight: '5px' }}>
            input2
          </label>
          <input {...register({ name: 'input2', type: 'text' })} />
        </div>
        <input
          style={{ borderColor: isValid || !isDirty ? 'inherit' : 'red' }}
          type="submit"
          value={isSubmitting ? 'Submitting...' : 'Submit'}
        />
      </form>
      <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
        <strong>Form state:</strong>
        <JSONPrettyPrint json={form} />
      </div>
    </>
  )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Lib/Form',
  component: ComplexForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ComplexForm>

const SimpleTemplate: ComponentStory<typeof SimpleForm> = (args) => <SimpleForm {...args} />

const ComplexTemplate: ComponentStory<typeof ComplexForm> = (args) => <ComplexForm {...args} />
export const Simple = SimpleTemplate.bind({})

export const Complex = ComplexTemplate.bind({})
