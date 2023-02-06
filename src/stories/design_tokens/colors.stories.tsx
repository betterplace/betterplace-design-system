import { Meta, StoryObj } from '@storybook/react'
import themeTokens from '../../../build/json/themes/org.json'
import globalTokens from '../../../build/json/globals.json'

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

export default {
  title: 'Tokens/Colors',
  component: ColorSwatch,
} as Meta<typeof ColorSwatch>

export const GlobalColors: StoryObj = {
  args: {
    colors: Object.keys(globalTokens).filter((token) => token.startsWith('betterplace-color')),
  },
}

export const MainColors: StoryObj = {
  args: {
    colors: Object.keys(themeTokens).filter((token) => token.startsWith('betterplace-color')),
  },
}
