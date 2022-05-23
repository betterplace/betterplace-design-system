import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withThemeProvider } from '../../../helpers'
import FigmaCfg from './figma.lock'
import Icon from './icon'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Icons/Icons and Illustrations/Icon',
  component: Icon,
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
} as ComponentMeta<typeof Icon>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const IconTypeArrowRight = Template.bind({})
IconTypeArrowRight.args = {
  iconType: 'arrowRight',
}

export const IconTypeCamera = Template.bind({})
IconTypeCamera.args = {
  iconType: 'camera',
}

export const IconTypeCheckmark = Template.bind({})
IconTypeCheckmark.args = {
  iconType: 'checkmark',
}

export const IconTypeUser = Template.bind({})
IconTypeUser.args = {
  iconType: 'user',
}

export const IconTypeHeart = Template.bind({})
IconTypeHeart.args = {
  iconType: 'heart',
}

export const IconTypeHome = Template.bind({})
IconTypeHome.args = {
  iconType: 'home',
}

export const IconTypeSearch = Template.bind({})
IconTypeSearch.args = {
  iconType: 'search',
}

export const IconTypeUserAlt = Template.bind({})
IconTypeUserAlt.args = {
  iconType: 'userAlt',
}

export const IconTypeInfoI = Template.bind({})
IconTypeInfoI.args = {
  iconType: 'infoI',
}
