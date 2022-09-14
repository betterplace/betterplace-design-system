declare module 'remotedev' {
  export interface RemoteDev {
    init(state: any, actionType: string): void
    send(actionType: any, state: any): void
    subscribe(message: any): void
  }
  export interface RemoteDevConfig {
    features?: object | boolean
    name?: string
    instanceId?: string
    maxAge?: number
    serialize?: boolean
  }
  export function connectViaExtension(options?: RemoteDevConfig): RemoteDev
  export function extractState(message: any): any
}
