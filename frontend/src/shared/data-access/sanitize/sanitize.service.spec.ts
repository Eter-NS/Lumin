import { TestBed } from '@angular/core/testing'

import { SanitizeService } from './sanitize.service'
import { DomSanitizer } from '@angular/platform-browser'
import { Provider } from '@angular/core'

describe('SanitizeService', () => {
  // Mocks
  let sanitizeMock: jest.Mock

  // Service
  let service: SanitizeService

  beforeEach(() => {
    sanitizeMock = jest.fn()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DomSanitizer,
          useValue: { sanitize: sanitizeMock },
        },
      ] as Provider[],
    })
    service = TestBed.inject(SanitizeService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it(`should call the DomSanitizer.sanitize method.`, () => {
    // Arrange

    // Act
    service.sanitizeText('xyz')

    // Assert
    expect(sanitizeMock).toHaveBeenCalled()
  })
})
