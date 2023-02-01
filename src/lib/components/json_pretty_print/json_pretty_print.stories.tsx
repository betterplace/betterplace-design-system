import { Meta, StoryObj } from '@storybook/react'

import JSONPrettyPrint from './json_pretty_print'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: JSONPrettyPrint,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {},
} as Meta<typeof JSONPrettyPrint>

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj = {
  args: {
    json: { bar: 'Lorem ipsum sic dolor', baz: ['it is a string', { foo: false, sus: null }], bub: 123 },
  }
}
