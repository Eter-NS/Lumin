import { HttpClient, HttpParams } from '@angular/common/http'
import { inject, Injectable, OnDestroy } from '@angular/core'
import { APP_CONFIG } from '@lumin/shared/app-config/app-config.token'
import { RxjsWebSocket } from '@lumin/shared/injection-tokens/webSocket-rxjs/webSocket.token'
import { ChatMessage } from '@lumin/shared/models/chatMessage.type'
import { ID } from '@lumin/shared/models/id.type'
import { WebSocketConnection } from '@lumin/shared/models/webSocketConnection.interface'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ChatMessagesService implements OnDestroy {
  #config = inject(APP_CONFIG)
  #http = inject(HttpClient)
  #webSocket = inject(RxjsWebSocket)

  private _messagesWebSocketConnections: Map<string, WebSocketConnection<ChatMessage[]>> = new Map()

  ngOnDestroy(): void {
    this._closeWebsocketConnections()
  }

  getCurrentMessages(userId: ID, chatId: ID): Observable<ChatMessage[]> {
    const params = new HttpParams().set('userId', userId).set('chatId', chatId)

    return this.#http.get<ChatMessage[]>(this.#config.apiUrl + `/messages`, { params })
  }

  createConnection(userId: ID, chatId: ID): WebSocketConnection<ChatMessage[]> {
    const params = `?userId=${encodeURIComponent(userId)}&chatId=${encodeURIComponent(chatId)}`
    const url = `${this.#config.webSocketUrl}/chat${params}`

    const socket = this.#webSocket<ChatMessage[]>({ url })

    const controller = {
      _socket: socket,
      listener: socket.asObservable(),
      sendMessage: socket.next,
      closeConnection: () => {
        socket.complete()
        this._untrackConnection(params)
      },
    }

    this._trackConnection(params, controller)

    return controller
  }

  getActiveConnection(userId: ID, chatId: ID) {
    const key = `?userId=${encodeURIComponent(userId)}&chatId=${encodeURIComponent(chatId)}`

    return this._messagesWebSocketConnections.get(key) || null
  }

  private _trackConnection(key: string, socket: WebSocketConnection<ChatMessage[]>) {
    this._messagesWebSocketConnections.set(key, socket)
  }

  private _untrackConnection(key: string) {
    this._messagesWebSocketConnections.delete(key)
  }

  private _closeWebsocketConnections() {
    this._messagesWebSocketConnections.forEach((connection) => {
      connection.closeConnection()
    })
  }
}
