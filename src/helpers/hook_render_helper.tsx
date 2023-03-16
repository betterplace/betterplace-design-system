/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, useState } from 'react'
import { JSONPrettyPrint } from '../lib/json_pretty_print'

export const HookRenderHelper = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
  const [key, setKey] = useState(1)
  const [_, setRerender] = useState(1)

  return (
    <div key={key}>
      {children}
      <hr />
      <div>
        <button onClick={() => setRerender((x) => x + 1)}>Rerender Hook</button>
        <button onClick={() => setKey((x) => x + 1)}>Remount Hook</button>
      </div>
    </div>
  )
}

export const RenderHook = <T extends (...args: any[]) => any>(hook: T) => {
  const name = `${hook.name}[0].toUpperCase()}${hook.name.slice(1)}`

  const Component = (props: Parameters<typeof hook>[0]) => {
    const result = hook(props)
    return <JSONPrettyPrint json={result} />
  }
  Component.displayName = `${name}Demo`
  return Component
}
