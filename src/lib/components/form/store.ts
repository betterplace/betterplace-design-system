import {
  BehaviorSubject,
  filter,
  Observable,
  Observer,
  reduce,
  scan,
  Subject,
  SubjectLike,
  Subscribable,
  switchMap,
  Unsubscribable,
  withLatestFrom,
} from 'rxjs'
import { Action, Effect, Reducer } from './types'
export function isActionOfType<T extends string>(type: T) {
  return <A extends Action>([action]: [A, unknown, unknown]) => action.type === type
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionCreator = (payload?: any) => Action
export function isActionOf<AC extends ActionCreator>(creator: AC) {
  const type = creator().type
  return <A extends Action, S extends Record<string, unknown>>(source$: Observable<[A, S, S]>) =>
    source$.pipe(filter(isActionOfType(type))) as Observable<[ReturnType<AC>, S, S]>
}

export function createActionCreator<T extends string>(type: T) {
  return <P>() =>
    (payload: P) => ({ type, payload })
}
const ActionTypes = {
  Add: 'Add',
} as const
const add = createActionCreator(ActionTypes.Add)<number>()

class Store<S extends Record<string, unknown>, A extends Action> implements Subscribable<S>, Observer<A> {
  protected _complete$: Subject<void> = new Subject()

  protected _error$: Subject<any> = new Subject()
  protected _state$: BehaviorSubject<S | undefined> = new BehaviorSubject<S | undefined>(undefined)
  protected _action$: Subject<A> = new Subject()
  protected _sideEffect$: Subject<[A, S, S]> = new Subject()
  constructor(getInitialState: () => S, reducer: Reducer<S, A>, effects: Array<Effect<S, A>>) {
    const state$ = this._action$.pipe(
      scan((state, action) => {
        const newState = reducer(state, action)
        this._sideEffect$.next([action, state, newState])
        return newState
      }, getInitialState())
    )
    const sideEffect$ = this._action$.pipe(withLatestFrom(this._state$))
  }

  pipe = this._state$.pipe.bind(this._state$)
  subscribe(observer: Partial<Observer<S>>): Unsubscribable {
    throw new Error('Method not implemented.')
  }
  next: (value: A) => void = (value) => {
    this._action$.next(value)
  }
  error: (err: any) => void = (err) => {
    this._error$.next(err)
  }
  complete: () => void = () => this._complete$.next()
}

export default Store
