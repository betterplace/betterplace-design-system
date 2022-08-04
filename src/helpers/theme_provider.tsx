import { ReactFramework, StoryContext } from '@storybook/react'
import React, { ReactNode, useState } from 'react'
import '../../build/css/globals.css'
import tokens from '../../config/tokens.json'
import AVAILABLE_THEMES from '../lib/shared/themes'
const ThemeKeys = AVAILABLE_THEMES.map((theme) => theme.key)
type Theme = typeof ThemeKeys[number]

type ThemeProviderProps = {
  theme: Theme
  children: ReactNode
}
type Tokens = typeof tokens
export type ThemeProviderContext = {
  theme?: Theme
  tokens?: {
    global: Tokens['global']
    theme: Tokens[Exclude<keyof Tokens, 'globals'>]
  }
}

export const ThemeContext = React.createContext<ThemeProviderContext>({})

export const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  const [themeVars, setThemeVars] = useState('')

  import(`../../build/css/themes/${theme}.css`).then((styles) => {
    setThemeVars(styles.default)
  })

  return (
    <ThemeContext.Provider value={{ theme, tokens: { global: tokens.global, theme: tokens[theme] } }}>
      <style id="theme-vars">{themeVars}</style>
      {children}
    </ThemeContext.Provider>
  )
}

export const withThemeProvider = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Story: React.ComponentType<StoryContext<ReactFramework, any>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: StoryContext<ReactFramework, any>
) => {
  return (
    <ThemeProvider theme={context.globals.theme}>
      <Story {...context} />
    </ThemeProvider>
  )
}
