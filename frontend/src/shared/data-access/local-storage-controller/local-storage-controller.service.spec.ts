import { LocalStorageController } from './local-storage-controller.service'

describe(`LocalStorageController`, () => {
  let localStorageController: LocalStorageController

  beforeEach(() => {
    localStorage.clear()
  })

  beforeEach(() => {
    localStorageController = new LocalStorageController()
  })

  it('should be defined', () => {
    expect(LocalStorageController).toBeDefined()
  })

  describe(`get`, () => {
    it(`should return null if key is not found`, () => {
      // Act
      const result = localStorageController.get('key')

      // Assert
      expect(result).toBeNull()
    })

    it(`should return string value if key is found`, () => {
      // Arrange
      localStorage.setItem('key', 'exampleValue')

      // Act
      const result = localStorageController.get<string>('key')

      // Assert
      expect(result).toEqual('exampleValue')
    })

    it(`should return parsed value if key is found`, () => {
      // Arrange
      const exampleStoredItem = { exampleKey: 'ExampleValue' }
      localStorage.setItem('key', JSON.stringify(exampleStoredItem))

      // Act
      const result = localStorageController.get<string>('key')

      // Assert
      expect(result).toEqual(exampleStoredItem)
    })
  })

  describe(`has`, () => {
    it(`should return false if the key does not exist.`, () => {
      // Act
      const result = localStorageController.has('key')

      // Assert
      expect(result).toBeFalsy()
    })

    it(`should return true if the key does exist.`, () => {
      // Arrange
      localStorage.setItem(
        'key',
        JSON.stringify({
          id: 'bhfbhsdfbsdjf',
        })
      )

      // Act
      const result = localStorageController.has('key')

      // Assert
      expect(result).toBeTruthy()
    })
  })

  describe(`set`, () => {
    it(`should throw the error if user tries to save a function to the LocalStorage.`, () => {
      // Arrange
      const payload = () => {
        return `I'm just an innocent function`
      }

      // Act & Assert
      expect(() => {
        localStorageController.set('key', payload)
      }).toThrow(new Error(`Tried to save a function named ${payload.name} to LocalStorage`))
    })

    it(`should call LocalStorage.setItem to set or overwrite value with given key (object/array).`, () => {
      // Arrange
      const payload = {
        id: 'dhsbhsdbfhsdbfsdf',
      }

      // Act
      localStorageController.set('key', payload)

      // Assert
      expect(localStorage.getItem('key')).toBe(JSON.stringify(payload))
    })

    it(`should call LocalStorage.setItem to set or overwrite value with given key (string).`, () => {
      // Arrange
      const payload = 'hello'

      // Act
      localStorageController.set('key', payload)

      // Assert
      expect(localStorage.getItem('key')).toBe(payload)
    })
  })

  describe(`delete`, () => {
    it(`should remove existing key-value pair from LocalStorage.`, () => {
      // Arrange
      localStorage.setItem(
        'key',
        JSON.stringify({
          id: 'fgikmbfnj3235',
        })
      )

      // Act
      localStorageController.delete('key')

      // Assert
      expect(localStorage.getItem('key')).toBeNull()
    })
  })
})
