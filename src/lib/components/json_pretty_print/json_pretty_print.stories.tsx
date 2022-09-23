import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import JSONPrettyPrint from './json_pretty_print'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/JSON Pretty Print',
  component: JSONPrettyPrint,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {},
} as ComponentMeta<typeof JSONPrettyPrint>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof JSONPrettyPrint> = (args) => <JSONPrettyPrint {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  json: { bar: 'Lorem ipsum sic dolor', baz: ['it is a string', { foo: false, sus: null }], bub: 123 },
}
