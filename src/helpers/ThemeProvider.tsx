import React, { ReactNode, useState } from 'react'
import { tokens } from '../../tokens'
import AVAILABLE_THEMES from '../lib/shared/themes'
const keys = AVAILABLE_THEMES.map((theme) => theme.key)
type Theme = typeof keys[number]

type ThemeProviderProps = {
  theme: Theme
  children: ReactNode
}

type Tokens = typeof tokens
export type ThemeProviderContext = {
  theme?: Theme
  tokens?: {
    global: Tokens['globals']
    theme: Tokens[Exclude<keyof Tokens, 'globals'>]
  }
}

export const ThemeContext = React.createContext<ThemeProviderContext>({})

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [themeStyles, setThemeStyles] = useState('')

  const theme: ThemeProviderContext = {
    theme: props.theme,
    tokens: {
      global: tokens.globals,
      theme: tokens[props.theme],
    },
  }

  import(`../../src/lib/theme/theme-${props.theme}.css`).then((styles) => {
    setThemeStyles(styles.default)
  })

  return (
    <ThemeContext.Provider value={theme}>
      <style id="theme">{themeStyles}</style>
      {props.children}
    </ThemeContext.Provider>
  )
}

export type ThemeDecoratorContext = { globals: { theme: Theme } }

export const withThemeProvider = (
  Story: React.ComponentType<ThemeDecoratorContext>,
  context: ThemeDecoratorContext
) => {
  return (
    <ThemeProvider theme={context.globals.theme}>
      <Story {...context} />
    </ThemeProvider>
  )
}
