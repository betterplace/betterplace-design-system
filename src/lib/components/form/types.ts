import { Observable } from 'rxjs'

export type Action = { type: string; payload?: unknown }
export type Reducer<S extends Record<string, unknown>, A extends Action> = (state: S | undefined, action: A) => S
export type Effect<S extends Record<string, unknown>, A extends Action> = <A1 extends A>(
  input: Observable<[A, S, S]>
) => Observable<A1>
