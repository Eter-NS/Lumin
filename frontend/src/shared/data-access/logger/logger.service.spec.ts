import { TestBed } from '@angular/core/testing'

import { LoggerService } from './logger.service'
import { Provider } from '@angular/core'
import { ApiLoggerService } from '../api-logger/api-logger.service'
import { DevelopmentLoggerService } from '../development-logger/development-logger.service'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { APP_CONFIG, APP_CONFIG_VALUE } from '../app-config/app-config.token'

describe('LoggerService - ApiLoggerService', () => {
  let service: LoggerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        {
          provide: APP_CONFIG,
          useValue: APP_CONFIG_VALUE,
        },
        {
          provide: LoggerService,
          useClass: ApiLoggerService,
        },
      ] as Provider[],
    })
    service = TestBed.inject(LoggerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
    expect(service instanceof ApiLoggerService).toBe(true)
  })
})

describe('LoggerService - DevelopmentLoggerService', () => {
  let service: LoggerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoggerService,
          useClass: DevelopmentLoggerService,
        },
      ] as Provider[],
    })
    service = TestBed.inject(LoggerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
    expect(service instanceof DevelopmentLoggerService).toBe(true)
  })
})
