import { useCallback } from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useForm } from './use_form'
import { JSONPrettyPrint } from '../../components'
type FormValues = { input2: string; input1: string }

const FormWithoutProvider = (_: {}) => {
  const onSubmit = useCallback((values: FormValues) => {
    return new Promise<FormValues>((resolve) => {
      setTimeout(() => resolve(values), 1000)
    })
  }, [])
  const form = useForm<FormValues>({ onSubmit, initialValues: { input2: '', input1: '' } })
  const { submit, register, isValid, isDirty, isSubmitting } = form
  return (
    <>
      <form onSubmit={submit} noValidate>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="input1" style={{ marginRight: '5px' }}>
            input1
          </label>
          <input {...register({ name: 'input1', type: 'text' })} id="input1" />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="input2" style={{ marginRight: '5px' }}>
            input2
          </label>
          <input {...register({ name: 'input2', type: 'text' })} id="input2" />
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
  title: 'Hooks/Form/Form without provider',
  component: FormWithoutProvider,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FormWithoutProvider>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormWithoutProvider> = (args) => <FormWithoutProvider {...args} />

export const Example = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Example.args = {}
