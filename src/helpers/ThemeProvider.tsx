import React, { ReactNode, useState } from 'react'
import { tokens } from '../../tokens'

export const AVAILABLE_THEMES = [
  {
    key: 'org',
    title: 'betterplace.org',
  },
  {
    key: 'at',
    title: 'betterplace.at',
  },
  {
    key: 'me',
    title: 'betterplace.me',
  },
] as const

const keys = AVAILABLE_THEMES.map((theme) => theme.key)
type Theme = typeof keys[number]

type ThemeProviderProps = {
  theme: Theme
  children: ReactNode
}

export const ThemeContext = React.createContext({})

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [themeStyles, setThemeStyles] = useState('')

  const theme = {
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

export const withThemeProvider = (Story: any, context: { globals: { theme: Theme } }) => {
  return (
    <ThemeProvider theme={context.globals.theme}>
      <Story {...context} />
    </ThemeProvider>
  )
}
