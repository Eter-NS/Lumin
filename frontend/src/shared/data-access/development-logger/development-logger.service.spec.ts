import { TestBed } from '@angular/core/testing'

import { DevelopmentLoggerService } from './development-logger.service'
import { Provider } from '@angular/core'
import { LogLevel } from '@lumin/shared/models/logLevel.type'

describe('DevelopmentLoggerService', () => {
  let service: DevelopmentLoggerService

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DevelopmentLoggerService] as Provider[] })
    service = TestBed.inject(DevelopmentLoggerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it(`should call console.log if the log level doesn't match the dictionary.`, () => {
    // Arrange
    const spy = jest.spyOn(console, 'log')

    // Act
    service.log('logx' as LogLevel, 'Hello World!')

    // Assert
    expect(spy).toHaveBeenCalledWith('Hello World!')
  })

  it(`should call any console method registered inside the dictionary when the key matches the level parameter.`, () => {
    // Arrange
    const spies = [
      jest.spyOn(console, 'info'),
      jest.spyOn(console, 'log'),
      jest.spyOn(console, 'warn'),
      jest.spyOn(console, 'error'),
    ]

    const dictionaryKeys: LogLevel[] = ['info', 'log', 'warning', 'error']

    // Act
    for (const level of dictionaryKeys) {
      service.log(level, 'Hello World!')
    }

    // Assert
    for (const spy of spies) {
      expect(spy).toHaveBeenCalled()
    }
  })
})
