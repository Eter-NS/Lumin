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

  describe(`get()`, () => {
    it(`should return null if key is not found`, () => {
      // Act
      const result = localStorageController.get('key')

      // Assert
      expect(result).toBeNull()
    })

    it(`should return value if key is found`, () => {
      // Arrange
      localStorage.setItem('key', 'exampleValue')

      // Act
      const result = localStorageController.get<string>('key')

      // Assert
      expect(result).toEqual('exampleValue')
    })
  })
})
