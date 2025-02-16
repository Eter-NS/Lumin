import { Observable } from 'rxjs'
import { WebSocketSubject } from 'rxjs/webSocket'

export interface WebSocketConnection<T> {
  _socket: WebSocketSubject<T>
  listener: Observable<T>
  sendMessage: (value: T) => void
  closeConnection: () => void
}
