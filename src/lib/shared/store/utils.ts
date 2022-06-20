import { filter, Observable } from 'rxjs'
import { Action, ActionCreator } from './types'

export function isActionOf<AC extends ActionCreator>(creator: AC) {
  const type = creator().type
  return <A extends Action, S extends {}>(source$: Observable<[A, S, S]>) =>
    source$.pipe(filter(isActionOfType(type))) as Observable<[ReturnType<AC>, S, S]>
}

export function isActionOfType<T extends string>(type: T) {
  return <A extends Action>([action]: [A, unknown, unknown]) => action.type === type
}

export function createActionCreator<T extends string>(type: T) {
  return <P>() =>
    <P1 extends P = P>(payload: P1) => ({ type, payload })
}
