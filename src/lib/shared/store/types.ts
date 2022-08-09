import { Observable } from 'rxjs'
export type Action = { type: string; payload?: unknown }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionCreator = (payload?: any) => Action
export type Reducer<S extends {}, A extends Action> = (state: S, action: A) => S
export type Effect<S extends {}, A extends Action> = (input: Observable<[A, S, S]>) => Observable<A>

export type ActionType<AC extends ActionCreator> = ReturnType<AC>
