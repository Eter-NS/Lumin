import { InjectionToken } from '@angular/core'
import { webSocket } from 'rxjs/webSocket'

export const RxjsWebSocket = new InjectionToken<typeof webSocket>(
  `Wrapper around RxJS's webSocket factory to make it easily injectable in DI.`,
  {
    providedIn: 'root',
    factory: () => {
      return webSocket
    },
  }
)
