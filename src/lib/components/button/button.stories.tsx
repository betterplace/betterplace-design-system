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
    design: FigmaCfg.themes
      ? FigmaCfg.themes.map(({ url, name }) => ({
          url,
          name,
          type: 'figspec',
          accessToken: process.env.STORYBOOK_FIGMA_ACCESS_TOKEN,
        }))
      : { type: 'figspec', accessToken: process.env.STORYBOOK_FIGMA_ACCESS_TOKEN, url: FigmaCfg.url },
  },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const TypePrimary = Template.bind({})
TypePrimary.args = {
  type: 'primary',
  size: 'large',
}

export const TypeDelete = Template.bind({})
TypeDelete.args = {
  type: 'delete',
  size: 'large',
}

export const TypeSecondary = Template.bind({})
TypeSecondary.args = {
  type: 'secondary',
  size: 'large',
}

export const SizeSmall = Template.bind({})
SizeSmall.args = {
  type: 'primary',
  size: 'small',
}

export const IconAny = Template.bind({})
IconAny.args = {
  type: 'primary',
  size: 'large',
  icon: undefined,
}
