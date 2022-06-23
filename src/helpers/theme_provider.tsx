import { ReactFramework, StoryContext } from '@storybook/react'
import React, { ReactNode, useState } from 'react'
import '../../build/css/globals.css'
import AVAILABLE_THEMES from '../lib/shared/themes'
const ThemeKeys = AVAILABLE_THEMES.map((theme) => theme.key)
type Theme = typeof ThemeKeys[number]

type ThemeProviderProps = {
  theme: Theme
  children: ReactNode
}

export const ThemeContext = React.createContext<Theme>('org')

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [themeVars, setThemeVars] = useState('')

  import(`../../build/css/themes/${props.theme}.css`).then((styles) => {
    setThemeVars(styles.default)
  })

  return (
    <ThemeContext.Provider value={props.theme}>
      <style id="theme-vars">{themeVars}</style>
      {props.children}
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
