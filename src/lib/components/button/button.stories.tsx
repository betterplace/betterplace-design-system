import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withThemeProvider } from '../../../helpers'
import FigmaCfg from './figma.lock'
import Button from './button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Buttons/Button',
  component: Button,
  decorators: [withThemeProvider],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {},
  parameters: {
    design: {
      type: 'figspec',
      accessToken: process.env.STORYBOOK_FIGMA_ACCESS_TOKEN,
      url: FigmaCfg.url,
    },
  },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
