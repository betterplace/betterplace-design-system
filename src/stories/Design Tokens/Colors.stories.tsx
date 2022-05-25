import { ComponentStory, ComponentMeta } from '@storybook/react'
import themeTokens from '../../../build/json/themes/org.json'

export default {
  title: 'Design Tokens/Colors',
} as ComponentMeta<typeof ColorSwatch>

type ColorSwatchProps = {
  colors: string[]
}

const ColorSwatch = ({ colors }: ColorSwatchProps) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {colors.map((color: string) => {
        return <div key={color} style={{ width: '4rem', height: '4rem', backgroundColor: `var(--${color})` }}></div>
      })}
    </div>
  )
}

const Template: ComponentStory<typeof ColorSwatch> = (args) => <ColorSwatch {...args} />

export const MainColors = Template.bind({})
MainColors.args = {
  colors: Object.keys(themeTokens).filter((token) => token.startsWith('betterplace-color')),
}
