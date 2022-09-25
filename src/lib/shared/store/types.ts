import type { Observable } from 'rxjs'
export type Action = { type: string; payload?: unknown }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionCreator = (payload?: any) => Action
export type Reducer<S extends {}, A extends Action> = (state: S, action: A) => S
export type EffectParams<S extends {}, A extends Action> = Observable<[A, S, S]>
export type Effect<S extends {}, A extends Action> = (input$: EffectParams<S, A>) => Observable<A>

export type ActionType<AC extends ActionCreator> = ReturnType<AC>
