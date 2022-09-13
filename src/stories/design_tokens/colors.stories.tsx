import { ComponentStory, ComponentMeta } from '@storybook/react'
import themeTokens from '../../../build/json/themes/org.json'
import globalTokens from '../../../build/json/globals.json'

export default {
  title: 'Design Tokens (Settings)/Colors',
} as ComponentMeta<typeof ColorSwatch>

type ColorSwatchProps = {
  colors: string[]
}

const ColorSwatch = ({ colors }: ColorSwatchProps) => {
  return (
    <table style={{ borderSpacing: '1rem' }}>
      <thead>
        <tr>
          <th>Color</th>
          <th>Token name</th>
        </tr>
      </thead>
      <tbody>
        {colors.map((color: string) => {
          return (
            <tr key={color}>
              <td
                style={{ width: '4rem', height: '4rem', backgroundColor: `var(--${color})`, borderRadius: '4px' }}
              ></td>
              <td>{color}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const Template: ComponentStory<typeof ColorSwatch> = (args) => <ColorSwatch {...args} />

export const GlobalColors = Template.bind({})
GlobalColors.args = {
  colors: Object.keys(globalTokens).filter((token) => token.startsWith('betterplace-color')),
}

export const MainColors = Template.bind({})
MainColors.args = {
  colors: Object.keys(themeTokens).filter((token) => token.startsWith('betterplace-color')),
}
