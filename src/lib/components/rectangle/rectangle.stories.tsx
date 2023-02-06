import { Meta, StoryObj } from '@storybook/react'

import FigmaCfg from './figma.lock'

import Rectangle from './rectangle'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Rectangle,
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
} as Meta<typeof Rectangle>

export const Default: StoryObj = {}
