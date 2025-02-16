/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing'
import { LazyInject } from './lazy-inject.service'

describe('LazyInject', () => {
  // Service
  let service: LazyInject

  beforeEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyInject],
    })

    service = TestBed.inject(LazyInject)
  })

  it('should be created', () => {
    // Assert
    expect(service).toBeTruthy()
  })

  describe('get()', () => {
    it('should retrieve the provider using the injector', async () => {
      // Arrange
      const tokenInstanceCaller = async () => {
        const el = await import('./testing/example-injectionToken.token')
        return el.exampleInjectionToken
      }

      // Act
      const result = await service.get(tokenInstanceCaller)

      // Assert
      const expectedValue = { name1: null }
      expect(result).toEqual(expectedValue)
    })
  })
})
