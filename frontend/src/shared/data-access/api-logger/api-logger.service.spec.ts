import { TestBed } from '@angular/core/testing'

import { ApiLoggerService } from './api-logger.service'
import { Provider } from '@angular/core'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { APP_CONFIG, APP_CONFIG_VALUE } from '../app-config/app-config.token'
import { LogLevel } from '@lumin/shared/models/logLevel.type'

describe('ApiLoggerService', () => {
  let service: ApiLoggerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        ApiLoggerService,
        {
          provide: APP_CONFIG,
          useValue: APP_CONFIG_VALUE,
        },
      ] as Provider[],
    })
    service = TestBed.inject(ApiLoggerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it(`should use the apiUrl base and append /log to the url.`, async () => {
    // Arrange
    const config = TestBed.inject(APP_CONFIG)
    const httpTesting = TestBed.inject(HttpTestingController)

    // Act
    service.log('info', 'Hello World!')

    const req = httpTesting.expectOne(
      {
        method: 'POST',
        url: `${config.apiUrl}/log`,
      },
      `API logger POST request`
    )

    // Assert
    expect(req.request.method).toBe('POST')
    expect(req.request.url).toBe('http://localhost:3000/api/log')
  })

  it(`should contain property level and message as body request.`, async () => {
    // Arrange
    const config = TestBed.inject(APP_CONFIG)
    const httpTesting = TestBed.inject(HttpTestingController)

    const level: LogLevel = 'log'
    const message = 'Hello World!'

    // Act
    service.log(level, message)

    const req = httpTesting.expectOne(
      {
        method: 'POST',
        url: `${config.apiUrl}/log`,
      },
      `API logger POST request`
    )

    // Assert
    expect(req.request.body).toEqual({ level, message })
  })
})
