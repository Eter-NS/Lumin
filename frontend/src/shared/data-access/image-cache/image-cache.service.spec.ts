/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/shared/data-access/image-cache/image-cache.service.spec.ts
import { TestBed } from '@angular/core/testing'
import { ImageCacheService, ImageCacheValue } from './image-cache.service'

describe('ImageCacheService', () => {
  let service: ImageCacheService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ImageCacheService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('get()', () => {
    it('should return the value associated with the key if it exists.', () => {
      // Arrange
      const key = 'testKey'
      const fileData: ImageCacheValue = {
        url: 'http://example.com/test.jpg',
        lastModified: Date.now(),
      }
      service.push(key, fileData)

      // Act
      const result = service.get(key)

      // Assert
      expect(result).toEqual(fileData)
    })

    it('should return undefined if the key does not exist.', () => {
      // Arrange
      const nonExistentKey = 'nonExistentKey'

      // Act
      const result = service.get(nonExistentKey)

      // Assert
      expect(result).toBeUndefined()
    })

    it('should return undefined and log a warning if the key is not a string.', () => {
      // Arrange
      const nonStringValue = 2317
      const consoleWarnSpy = jest.spyOn(console, 'warn')

      // Act
      const result = service.get(nonStringValue as any)

      // Assert
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        `Expected a string, received: ${JSON.stringify(nonStringValue)}`
      )
      expect(result).toBeUndefined()
    })
  })

  describe('generateUniqueKey()', () => {
    it('should generate a unique key based on the file properties.', () => {
      // Arrange
      const lastModified = Date.now()
      const file = new File([''], 'test.jpg', { type: 'image/jpeg', lastModified })

      // Act
      const result = service.generateUniqueKey(file)

      // Assert
      expect(result).toEqual(`test.jpg-${file.size}-${lastModified}`)
    })

    it('should return undefined if the input is not a File object.', () => {
      // Arrange
      const nonFileInput = 'notAFile'

      // Act
      const result = service.generateUniqueKey(nonFileInput as any)

      // Assert
      expect(result).toBeUndefined()
    })
  })

  describe('push()', () => {
    it('should add a new value to the cache.', () => {
      // Arrange
      const key = 'newKey'
      const fileData: ImageCacheValue = {
        url: 'http://example.com/new.jpg',
        lastModified: Date.now(),
      }

      // Act
      service.push(key, fileData)

      // Assert
      expect(service.get(key)).toEqual(fileData)
    })

    it('should update an existing value in the cache.', () => {
      // Arrange
      const key = 'existingKey'
      const initialFileData: ImageCacheValue = {
        url: 'http://example.com/initial.jpg',
        lastModified: Date.now(),
      }
      service.push(key, initialFileData)

      const updatedFileData: ImageCacheValue = {
        url: 'http://example.com/updated.jpg',
        lastModified: Date.now(),
      }

      // Act
      service.push(key, updatedFileData)

      // Assert
      expect(service.get(key)).toEqual(updatedFileData)
    })

    it('should throw an error if the key is not a string.', () => {
      // Arrange
      const key = 123
      const fileData: ImageCacheValue = {
        url: 'http://example.com/test.jpg',
        lastModified: Date.now(),
      }

      // Act & Assert
      expect(() => service.push(key as any, fileData)).toThrow(
        new Error(`Expected key to be a string, received: ${key}`)
      )
    })

    it('should throw an error if the key is empty.', () => {
      // Arrange
      const key = ''
      const fileData: ImageCacheValue = {
        url: 'http://example.com/test.jpg',
        lastModified: Date.now(),
      }

      // Act & Assert
      expect(() => service.push(key, fileData)).toThrow(new Error('Key cannot be empty'))
    })

    it('should log a warning if the value is not an object.', () => {
      // Arrange
      const key = 'testKey'
      const nonObjectValue = 'notAnObject'

      // Act & Assert
      expect(() => service.push(key, nonObjectValue as any)).toThrow(
        new Error(
          `Expected value to be an object with properties \`lastModified\` and \`url\`, received: "notAnObject"`
        )
      )
    })
  })
})
