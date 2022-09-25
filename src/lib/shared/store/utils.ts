import { filter, Observable } from 'rxjs'
import { Action, ActionCreator } from './types'

export function isActionOf<AC extends ActionCreator>(creator: AC | AC[]) {
  const type = Array.isArray(creator) ? creator.map((c) => c().type) : creator().type
  return <A extends Action, S extends {}>(source$: Observable<[A, S, S]>) =>
    source$.pipe(filter(isActionOfType(type))) as Observable<[ReturnType<AC>, S, S]>
}

export function isActionOfType<T extends string>(
  type: T | T[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): <A extends Action>([action]: [A, any, any]) => boolean {
  if (Array.isArray(type)) return ([action]) => type.includes(action.type as T)
  return ([action]) => action.type === type
}

export function createActionCreator<T extends string>(type: T) {
  return <P>() =>
    (payload: P) => {
      return { type, payload }
    }
}
