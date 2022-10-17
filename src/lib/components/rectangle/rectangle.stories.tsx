import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FigmaCfg from './figma.lock'

import Rectangle from './rectangle'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/a testruncomponent/testruncomponent/Rectangle',
  component: Rectangle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {},

  parameters: {
    design: FigmaCfg.themes.length
      ? FigmaCfg.themes.map(({ url, name }) => ({
          url,
          name,
          type: 'figspec',
          accessToken: import.meta.env.STORYBOOK_FIGMA_ACCESS_TOKEN,
        }))
      : { type: 'figspec', accessToken: import.meta.env.STORYBOOK_FIGMA_ACCESS_TOKEN, url: FigmaCfg.url },
  },
} as ComponentMeta<typeof Rectangle>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Rectangle> = (args) => <Rectangle {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {}
