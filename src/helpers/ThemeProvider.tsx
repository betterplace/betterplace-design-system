import React, { ReactNode, useState } from 'react'
import { Tokens } from '../../tokens'

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

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [themeStyles, setThemeStyles] = useState('')

  const tokens = {
    globals: Tokens.globals,
    [props.theme]: Tokens[props.theme],
  }

  console.log(tokens)

  const ThemeContext = React.createContext(props.theme)

  import(`../../src/lib/theme/theme-${props.theme}.css`).then((styles) => {
    setThemeStyles(styles.default)
  })

  return (
    <ThemeContext.Provider value={props.theme}>
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
