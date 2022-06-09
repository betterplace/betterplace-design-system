import {
  BehaviorSubject,
  filter,
  merge,
  Observable,
  Observer,
  scan,
  Subject,
  Subscribable,
  Unsubscribable,
  delay,
} from 'rxjs'

import { Action, Effect, Reducer, Values } from './types'
export function isActionOfType<T extends string>(type: T) {
  return <A extends Action>([action]: [A, unknown, unknown]) => action.type === type
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionCreator = (payload?: any) => Action
export function isActionOf<AC extends ActionCreator>(creator: AC) {
  const type = creator().type
  return <A extends Action, S extends {}>(source$: Observable<[A, S, S]>) =>
    source$.pipe(filter(isActionOfType(type))) as Observable<[ReturnType<AC>, S, S]>
}

export function createActionCreator<T extends string>(type: T) {
  return <P>() =>
    <P1 extends P = P>(payload: P1) => ({ type, payload })
}

class Store<S extends {}, A extends Action> implements Subscribable<S>, Observer<A> {
  protected _complete$: Subject<void> = new Subject()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _error$: Subject<any> = new Subject()
  protected _state$: BehaviorSubject<S>
  protected _action$: Subject<A> = new Subject()
  protected _sideEffect$: Subject<[A, S, S]> = new Subject()
  constructor(initialState: S, reducer: Reducer<S, A>, effects: Array<Effect<S, A>>) {
    console.log('Store created')
    this._state$ = new BehaviorSubject<S>(initialState)
    this.pipe = this._state$.pipe
    this._action$
      .pipe(
        scan((state, action) => {
          const newState = reducer(state, action)
          this._sideEffect$.next([action, state, newState])
          console.log(action, state, newState, state === newState)
          return newState
        }, initialState)
      )
      .subscribe((state) => this._state$.next(state))
    merge(...effects.map((effect) => effect(this._sideEffect$)))
      .pipe(delay(33))
      .subscribe((action) => {
        console.log('from side-effect', action)
        this._action$.next(action as A)
      })
    this._action$.next({ type: '@@init', payload: undefined } as A)
  }

  pipe: typeof this._state$.pipe
  subscribe(observer: Partial<Observer<S>>): Unsubscribable {
    return this._state$.subscribe(observer)
  }
  next: (value: A) => void = (value) => {
    this._action$.next(value)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (err: any) => void = (err) => {
    this._action$.next(err)
  }
  complete: () => void = () => this._action$.complete()
}

export default Store
