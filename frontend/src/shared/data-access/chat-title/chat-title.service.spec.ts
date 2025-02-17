import { TestBed } from '@angular/core/testing'

import { ChatTitleService } from './chat-title.service'
import { Provider } from '@angular/core'
import { APP_CONFIG, APP_CONFIG_VALUE } from '../app-config/app-config.token'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { firstValueFrom } from 'rxjs'
import { generateId } from '@lumin/shared/tools/generateId/generateId'
import { ID } from '@lumin/shared/models/id.type'

describe('ChatTitleService', () => {
  let service: ChatTitleService
  let httpTesting: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
      ] as Provider[],
    })

    service = TestBed.inject(ChatTitleService)
    httpTesting = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTesting.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe(`getTitle()`, () => {
    const userId = generateId<ID>(27)
    const chatId = generateId<ID>(27)

    it(`should send a GET request to the correct API endpoint with valid parameters.`, async () => {
      // Act
      firstValueFrom(service.getTitle(userId, chatId))

      const req = httpTesting.expectOne({
        method: 'GET',
        url: `${TestBed.inject(APP_CONFIG).apiUrl}/chat-title?userId=${userId}&chatId=${chatId}`,
      })

      // Assert
      expect(req.request.params.get('userId')).toBe(userId)
      expect(req.request.params.get('chatId')).toBe(chatId)
    })
  })

  describe(`updateTitle()`, () => {
    const userId = generateId<ID>(27)
    const chatId = generateId<ID>(27)

    it(`should send a PATCH request to the correct API endpoint with valid JSON body.`, () => {
      // Arrange
      const newTitle = 'a a title'

      // Act
      firstValueFrom(service.updateTitle(userId, chatId, newTitle))

      const req = httpTesting.expectOne({
        method: 'PATCH',
        url: `${TestBed.inject(APP_CONFIG).apiUrl}/chat-title`,
      })

      // Assert
      expect(req.request.body).toEqual({
        userId,
        chatId,
        newTitle,
      })
    })
  })
})
