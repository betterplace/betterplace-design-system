import React, { ReactNode, useState } from 'react'
import tokens from '../../config/tokens.json'
import '../../build/css/globals.css'

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
  const [themeVars, setThemeVars] = useState('')

  const theme = {
    theme: props.theme,
    tokens: {
      global: tokens.global,
      theme: tokens[props.theme],
    },
  }

  import(`../../build/css/themes/${props.theme}.css`).then((styles) => {
    setThemeVars(styles.default)
  })

  return (
    <ThemeContext.Provider value={theme}>
      <style id="theme-vars">{themeVars}</style>
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
