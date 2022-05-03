import React, { ReactNode } from 'react'
import { Tokens } from '../../tokens'

export const AVAILABLE_THEMES = {
  org: 'betterplace.org',
  at: 'betterplace.at',
  me: 'betterplace.me',
}

type Theme = keyof typeof AVAILABLE_THEMES

type ThemeProviderProps = {
  theme: Theme
  children: ReactNode
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const tokens = {
    globals: Tokens.globals,
    [props.theme]: Tokens[props.theme],
  }

  console.log(tokens)

  const ThemeContext = React.createContext(props.theme)

  return (
    <ThemeContext.Provider value={props.theme}>
      <div className={'theme-' + props.theme}>{props.children}</div>
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
