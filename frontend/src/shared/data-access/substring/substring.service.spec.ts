import { TestBed } from '@angular/core/testing'
import { SubstringService, SubstringCacheValue } from './substring.service'

type ComputeSubstringReturnType = ReturnType<SubstringService['computeSubstring']>

describe(`SubstringService`, () => {
  let service: SubstringService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SubstringService)
  })

  it(`should be created.`, () => {
    expect(service).toBeTruthy()
  })

  describe(`get()`, () => {
    it(`should return undefined if the key is not in the cache.`, () => {
      // Arrange
      const key = 'testKey-12'

      // Act & Assert
      expect(service.get(key)).toBeUndefined()
    })

    it(`should return the cached value if the key exists.`, () => {
      // Arrange
      const key = 'testKey-12'

      // Act
      const value: SubstringCacheValue = { name: 'testName', truncated: true }
      service.push(key, value)

      // Assert
      expect(service.get(key)).toEqual(value)
    })
  })

  describe(`push()`, () => {
    it(`should store the value in the cache.`, () => {
      // Arrange
      const key = 'testKey-10'

      // Act
      const value: SubstringCacheValue = { name: 'testName', truncated: true }
      service.push(key, value)

      // Assert
      expect(service.get(key)).toEqual(value)
    })
  })

  describe(`computeSubstring()`, () => {
    it(`should return the substring without truncation if the source is a string and length is less than endIndex.`, () => {
      // Arrange
      const source = 'testString'
      const endIndex = 10

      // Act
      const result = service.computeSubstring(source, endIndex)

      // Assert
      expect(result).toEqual({
        accessKey: `${source}-${endIndex}`,
        data: { name: source, truncated: false },
      } satisfies ComputeSubstringReturnType)
    })

    it(`should return the substring with truncation if the source is a string and length is greater than endIndex.`, () => {
      // Arrange
      const source = 'testString'
      const endIndex = 3

      // Act
      const result = service.computeSubstring(source, endIndex)

      // Assert
      expect(result).toEqual({
        accessKey: `${source}-${endIndex}`,
        data: { name: 'tes', truncated: true },
      } satisfies ComputeSubstringReturnType)
    })

    it(`should handle empty source string correctly.`, () => {
      // Arrange
      const source = ''
      const endIndex = 10

      // Act
      const result = service.computeSubstring(source, endIndex)

      // Assert
      expect(result).toEqual({
        accessKey: `${source}-${endIndex}`,
        data: { name: '', truncated: false },
      } satisfies ComputeSubstringReturnType)
    })

    it(`should handle large endIndex correctly.`, () => {
      // Arrange
      const source = 'testString'
      const endIndex = 20

      // Act
      const result = service.computeSubstring(source, endIndex)

      // Assert
      expect(result).toEqual({
        accessKey: `${source}-${endIndex}`,
        data: { name: source, truncated: false },
      } satisfies ComputeSubstringReturnType)
    })
  })
})
