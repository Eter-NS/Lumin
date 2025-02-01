import { Provider } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { APP_CONFIG, APP_CONFIG_VALUE } from '../app-config/app-config.token'
import { LoggerService } from './logger.service'
import { loggerServiceFactory } from './loggerService.factory'
import { ApiLoggerService } from '../api-logger/api-logger.service'
import { DevelopmentLoggerService } from '../development-logger/development-logger.service'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe(`loggerServiceFactory`, () => {
  describe(`ApiLoggerService`, () => {
    it(`should inject ApiLoggerService.`, () => {
      // Arrange
      const appConfigValueMock: typeof APP_CONFIG_VALUE = {
        ...APP_CONFIG_VALUE,
        production: true,
      }
      prepareTestBed(appConfigValueMock)

      // Act
      const service = TestBed.inject(LoggerService)

      // Assert
      expect(service instanceof ApiLoggerService).toBe(true)
    })
  })

  describe(`DevelopmentLoggerService`, () => {
    it(`should `, () => {
      // Arrange
      const appConfigValueMock: typeof APP_CONFIG_VALUE = {
        ...APP_CONFIG_VALUE,
        production: false,
      }
      prepareTestBed(appConfigValueMock)

      // Act
      const service = TestBed.inject(LoggerService)

      // Assert
      expect(service instanceof DevelopmentLoggerService).toBe(true)
    })
  })
})

function prepareTestBed(config: typeof APP_CONFIG_VALUE) {
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(withFetch()),
      provideHttpClientTesting(),
      { provide: APP_CONFIG, useValue: config },
      {
        provide: LoggerService,
        useFactory: loggerServiceFactory,
        deps: [APP_CONFIG],
      },
    ] as Provider[],
  })
}
