import { TestBed } from '@angular/core/testing'

import { CustomErrorHandler } from './custom-error-handler.service'
import { Provider } from '@angular/core'
import { LoggerService } from '../logger/logger.service'

describe('CustomErrorHandler', () => {
  // Mocks
  const loggerServiceMock = {
    log: jest.fn(),
  }

  // Service
  let service: CustomErrorHandler

  beforeEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoggerService,
          useValue: loggerServiceMock,
        },
        CustomErrorHandler,
      ] as Provider[],
    })
    service = TestBed.inject(CustomErrorHandler)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it(`should extract 'message' property from the parameter of Error instance.`, () => {
    // Arrange
    const message = 'an example error'
    const error = new Error(message)

    // Act
    service.handleError(error)

    // Assert
    expect(loggerServiceMock.log).toHaveBeenCalledWith('error', message)
  })

  it(`should use value from the parameter of type string.`, () => {
    // Arrange
    const message = 'an example error'

    // Act
    service.handleError(message)

    // Assert
    expect(loggerServiceMock.log).toHaveBeenCalledWith('error', message)
  })

  it(`should extract the message from the parameter object with 'message' property.`, () => {
    // Arrange
    const message = 'an example error'

    // Act
    service.handleError({ message })

    // Assert
    expect(loggerServiceMock.log).toHaveBeenCalledWith('error', message)
  })

  it(`should convert the parameter with \`JSON.stringify\` if the parameter doesn't meet previous conditions.`, () => {
    // Arrange
    const message = 'an example error'
    const unknownStructure = { msg: message }

    // Act
    service.handleError(unknownStructure)

    // Assert
    expect(loggerServiceMock.log).toHaveBeenCalledWith(
      'error',
      JSON.stringify(unknownStructure, null, 2)
    )
  })
})
