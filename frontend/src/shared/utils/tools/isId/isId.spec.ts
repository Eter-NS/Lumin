import { isId } from './isId'

describe(`isId`, () => {
  // Test case: value parameter is not a string
  it(`should return false when value parameter is not a string.`, () => {
    // Arrange
    const value = 123

    // Act
    const result = isId(value)

    // Assert
    expect(result).toBe(false)
  })

  // Test case: value parameter is an empty string
  it(`should return false when value parameter is an empty string.`, () => {
    // Arrange
    const value = ''

    // Act
    const result = isId(value)

    // Assert
    expect(result).toBe(false)
  })

  // Test case: value parameter has incorrect length (less than 27 characters)
  it(`should return false when value parameter has less than 27 characters.`, () => {
    // Arrange
    const value = '1234567890'

    // Act
    const result = isId(value)

    // Assert
    expect(result).toBe(false)
  })

  // Test case: value parameter has incorrect length (more than 27 characters)
  it(`should return false when value parameter has more than 27 characters.`, () => {
    // Arrange
    const value = '1234567890abcdefghijklmnopqrstuvwxyz1'

    // Act
    const result = isId(value)

    // Assert
    expect(result).toBe(false)
  })

  // Test case: value parameter contains non-alphanumeric characters
  it(`should return false when value parameter contains non-alphanumeric characters.`, () => {
    // Arrange
    const value = '123abc!@#'

    // Act
    const result = isId(value)

    // Assert
    expect(result).toBe(false)
  })

  // Test case: valid ID with correct length and alphanumeric characters
  it(`should return true when value parameter is a valid ID.`, () => {
    // Arrange
    const value = '1234567890abcdefghijKLMnopq'

    // Act
    const result = isId(value)

    // Assert
    expect(result).toBe(true)
  })
})
