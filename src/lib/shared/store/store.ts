import {
  BehaviorSubject,
  merge,
  Observer,
  scan,
  Subject,
  Subscribable,
  Unsubscribable,
  delay,
  observeOn,
  queueScheduler,
  shareReplay,
  Observable,
} from 'rxjs'

import { Action, Effect, Reducer } from './types'

class Store<S extends {}, A extends Action> implements Subscribable<S>, Observer<A> {
  protected _complete$: Subject<void> = new Subject()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _error$: Subject<any> = new Subject()
  protected _state$: Observable<S>
  protected _action$: Subject<A> = new Subject()
  protected _sideEffect$: Subject<[A, S, S]> = new Subject()
  pipe: typeof this._state$.pipe
  constructor(initialState: S, reducer: Reducer<S, A>, effects: Array<Effect<S, A>>) {
    console.log('Store created', initialState)
    this._state$ = this._action$.pipe(
      observeOn(queueScheduler),
      scan((state, action) => {
        const newState = reducer(state, action)
        this._sideEffect$.next([action, state, newState])
        console.log(action, state, newState, state === newState)
        return newState
      }, initialState),
      shareReplay(1)
    )
    this.pipe = this._state$.pipe

    merge(...effects.map((effect) => effect(this._sideEffect$)))
      .pipe(delay(33))
      .subscribe((action) => this._action$.next(action as A))
    this._action$.next({ type: '@@init', payload: undefined } as A)
  }

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
