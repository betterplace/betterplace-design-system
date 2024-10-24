import {
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
  ReplaySubject,
} from 'rxjs'
import { connectViaExtension, RemoteDev } from 'remotedev'

import { Action, Effect, Reducer } from './types'

class Store<S extends {}, A extends Action> implements Subscribable<S>, Observer<A> {
  protected complete$: Subject<void> = new Subject()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected error$: Subject<any> = new Subject()
  protected state$: Observable<S>
  protected _action$: ReplaySubject<A> = new ReplaySubject()

  protected action$: Observable<A>
  protected remotedev: RemoteDev

  protected _sideEffect$: Subject<[A, S, S]> = new Subject()
  pipe: typeof this.state$.pipe
  constructor(initialState: S, reducer: Reducer<S, A>, effects: Array<Effect<S, A>>, label = 'Store') {
    this.remotedev = connectViaExtension({ maxAge: 30, instanceId: `${label}_${Date.now()}` })
    this.action$ = merge(
      this._action$,
      merge<A[]>(...effects.map((effect) => effect(this._sideEffect$))).pipe(delay(33))
    )

    this.state$ = this.action$.pipe(
      observeOn(queueScheduler),
      scan((state, action) => {
        const newState = reducer(state, action)
        this._sideEffect$.next([action, state, newState])
        this.remotedev.send(action, newState)
        return newState
      }, initialState),
      shareReplay(1)
    )
    this.pipe = this.state$.pipe

    this._action$.next({ type: '@@init', payload: undefined } as A)
  }

  subscribe = (observer: Partial<Observer<S>>): Unsubscribable => {
    const sub = this.state$.subscribe({
      ...observer,
      complete: () => {
        observer.complete?.()
        this._sideEffect$.complete()
        this._action$.complete()
      },
    })
    return {
      unsubscribe: () => {
        sub.unsubscribe()
      },
    }
  }
  next: (value: A) => void = (value) => {
    this._action$.next(value)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (err: any) => void = (err) => {
    this._action$.next(err)
  }
  complete: () => void = () => {
    this._action$.complete()
    this._sideEffect$.complete()
  }
}

export default Store
