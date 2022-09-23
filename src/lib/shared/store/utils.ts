import { filter, Observable } from 'rxjs'
import { Action, ActionCreator } from './types'

export function isActionOf<AC extends ActionCreator>(creator: AC | AC[]) {
  const type = Array.isArray(creator) ? creator.map((c) => c().type) : creator().type
  return <A extends Action, S extends {}>(source$: Observable<[A, S, S]>) =>
    source$.pipe(filter(isActionOfType(type))) as Observable<[ReturnType<AC>, S, S]>
}

export function isActionOfType<T extends string>(type: T | T[]) {
  if (Array.isArray(type)) return <A extends Action>([action]: [A, unknown, unknown]) => type.includes(action.type as T)
  return <A extends Action>([action]: [A, unknown, unknown]) => action.type === type
}

export function createActionCreator<T extends string>(type: T) {
  return <P>() =>
    (payload: P) => ({ type, payload })
}
