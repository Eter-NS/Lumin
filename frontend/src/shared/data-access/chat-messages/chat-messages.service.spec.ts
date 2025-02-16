/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing'
import { ChatMessagesService } from './chat-messages.service'
import { Provider } from '@angular/core'
import { APP_CONFIG, APP_CONFIG_VALUE } from '@lumin/shared/app-config/app-config.token'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { firstValueFrom, of } from 'rxjs'
import { ID } from '@lumin/shared/models/id.type'
import { ChatMessage } from '@lumin/shared/models/chatMessage.type'
import { RxjsWebSocket } from '@lumin/shared/injection-tokens/webSocket-rxjs/webSocket.token'
import * as rxjs from 'rxjs/webSocket'
import { WebSocketConnection } from '@lumin/shared/models/webSocketConnection.interface'
import { generateId } from '@lumin/shared/tools/generateId/generateId'

function createQueryParams(userId: ID, chatId: ID) {
  return `?userId=${encodeURIComponent(userId)}&chatId=${encodeURIComponent(chatId)}`
}

function createFakeConnection(
  params: string,
  service: ChatMessagesService
): WebSocketConnection<ChatMessage[]> {
  const exampleWebSocketConnection = new rxjs.WebSocketSubject(of([] as ChatMessage[]))

  return {
    _socket: exampleWebSocketConnection,
    listener: exampleWebSocketConnection.asObservable(),
    sendMessage: exampleWebSocketConnection.next,
    closeConnection: () => {
      exampleWebSocketConnection.complete()
      service['_untrackConnection'](params)
    },
  }
}

describe('ChatMessagesService', () => {
  // Spies
  let rxjsWebSocketSpy: jest.SpyInstance<
    rxjs.WebSocketSubject<unknown>,
    [urlConfigOrSource: string | rxjs.WebSocketSubjectConfig<unknown>],
    any
  >

  // Service
  let service: ChatMessagesService

  beforeEach(() => {
    rxjsWebSocketSpy = jest.spyOn(rxjs, 'webSocket')
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_CONFIG,
          useValue: APP_CONFIG_VALUE,
        },
        {
          provide: RxjsWebSocket,
          useValue: rxjsWebSocketSpy,
        },
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        ChatMessagesService,
      ] as Provider[],
    })
    service = TestBed.inject(ChatMessagesService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe(`getCurrentMessages()`, () => {
    it(`should return the example ChatMessage array when the request resolves successfully.`, async () => {
      // Arrange
      const httpTesting = TestBed.inject(HttpTestingController)
      const userId = generateId<ID>(27)
      const chatId = generateId<ID>(27)

      // Act
      const requestPromise = firstValueFrom(service.getCurrentMessages(userId, chatId))

      const req = httpTesting.expectOne(
        {
          method: 'GET',
          url: `${TestBed.inject(APP_CONFIG).apiUrl}/messages${createQueryParams(userId, chatId)}`,
        },
        'Fetch current chat history'
      )

      req.flush([
        {
          chatId: generateId<ID>(27),
          sender: 'user',
          text: 'Warmup',
          timestamp: Date.now(),
          timezone: 'continent/city',
        },
      ] satisfies ChatMessage[])

      // Assert
      expect(req.request.method).toBe('GET')
      expect(req.request.params.has('userId')).toBeTruthy()
      expect(req.request.params.has('chatId')).toBeTruthy()

      expect((await requestPromise).length).toBe(1)
      expect((await requestPromise)[0].text).toBe('Warmup')
    })
  })

  describe(`createConnection()`, () => {
    it(`should return a WebSocketConnection object with defined communication interface.`, () => {
      // Arrange
      const userId = generateId<ID>(27)
      const chatId = generateId<ID>(27)

      // Act
      const chatConnection = service.createConnection(userId, chatId)

      // Assert
      expect(chatConnection._socket).toBeDefined()
      expect(chatConnection.listener).toBeDefined()
      expect(chatConnection.sendMessage).toBeDefined()
      expect(chatConnection.closeConnection).toBeDefined()

      expect(rxjsWebSocketSpy).toHaveBeenCalledWith({
        url: `${TestBed.inject(APP_CONFIG).webSocketUrl}/chat${createQueryParams(userId, chatId)}`,
      })
    })

    it(`should complete the WebSocket connection and remove the subject from the tracking list.`, () => {
      // Arrange
      const untrackConnectionSpy = jest.spyOn(service as any, '_untrackConnection')

      const userId = generateId<ID>(27)
      const chatId = generateId<ID>(27)

      // Act
      const chatConnection = service.createConnection(userId, chatId)

      chatConnection.closeConnection()

      // Assert
      expect(untrackConnectionSpy).toHaveBeenCalled()
    })
  })

  describe(`getActiveConnection()`, () => {
    it(`should return null if the specified WebSocket connection does not exist.`, () => {
      // Arrange
      const userId = generateId<ID>(27)
      const chatId = generateId<ID>(27)
      const exampleWebSocketConnection = createFakeConnection(
        createQueryParams(userId, chatId),
        service
      )
      service['_messagesWebSocketConnections'].set('example', exampleWebSocketConnection)

      // Act
      const result = service.getActiveConnection(userId, chatId)

      // Assert
      expect(result).toEqual(null)
    })

    it(`should return the existing WebSocket connection based on the query parameters.`, () => {
      // Arrange
      const userId = generateId<ID>(27)
      const chatId = generateId<ID>(27)
      const exampleWebSocketConnection = createFakeConnection(
        createQueryParams(userId, chatId),
        service
      )
      service['_messagesWebSocketConnections'].set(
        createQueryParams(userId, chatId),
        exampleWebSocketConnection
      )
      // Act
      const result = service.getActiveConnection(userId, chatId)

      // Assert
      expect(result).not.toEqual(null)
    })
  })

  describe(`_trackConnection()`, () => {
    it(`should add the provided WebSocket subject to the tracking list.`, () => {
      // Arrange
      const key = 'example'
      const exampleWebSocketConnection = createFakeConnection(
        createQueryParams('xyz' as ID, 'xyz2' as ID),
        service
      )
      service['_messagesWebSocketConnections'].clear()

      // Act
      service['_trackConnection'](key, exampleWebSocketConnection)

      // Assert
      expect(service['_messagesWebSocketConnections'].size).toBe(1)
    })
  })

  describe(`_untrackConnection()`, () => {
    it(`should remove the recently closed WebSocket connection subject fro m the tracking list.`, () => {
      // Arrange
      const key = 'example'
      const exampleWebSocketConnection = createFakeConnection(
        createQueryParams('xyz' as ID, 'xyz2' as ID),
        service
      )
      service['_messagesWebSocketConnections'].set(key, exampleWebSocketConnection)

      // Act
      service['_untrackConnection'](key)

      // Assert
      expect(service['_messagesWebSocketConnections'].size).toBe(0)
    })
  })

  describe(`_closeWebsocketConnections()`, () => {
    it(`should complete each existing connection.`, () => {
      // Arrange
      const key = 'example'
      const exampleWebSocketConnection = createFakeConnection(
        createQueryParams('xyz' as ID, 'xyz2' as ID),
        service
      )
      const completeSpy = jest.spyOn(exampleWebSocketConnection, 'closeConnection')

      service['_messagesWebSocketConnections'].set(key, exampleWebSocketConnection)

      // Act
      service['_closeWebsocketConnections']()

      // Assert
      expect(completeSpy).toHaveBeenCalled()
    })
  })
})
