import { generateId } from './generateId'

describe('generateId', () => {
  // Test case: Valid length
  it('should generate a random ID with the specified length.', () => {
    // Arrange
    const length = 27
    const expectedLength = length

    // Act
    const result = generateId(length)

    // Assert
    expect(result.length).toBe(expectedLength)
  })

  // Test case: Minimum valid length
  it('should generate a random ID with the minimum valid length (1).', () => {
    // Arrange
    const length = 1
    const expectedLength = length

    // Act
    const result = generateId(length)

    // Assert
    expect(result.length).toBe(expectedLength)
  })

  // Test case: Edge case - length 0 (should throw an error)
  it('should throw an error if the length is less than 1.', () => {
    // Arrange
    const length = 0
    const expectedError = 'Length must be greater than zero.'

    // Act & Assert
    expect(() => generateId(length)).toThrow(expectedError)
  })

  // Test case: Edge case - negative length (should throw an error)
  it('should throw an error if the length is a negative number.', () => {
    // Arrange
    const length = -5
    const expectedError = 'Length must be greater than zero.'

    // Act & Assert
    expect(() => generateId(length)).toThrow(expectedError)
  })

  // Test case: Randomness check (not an exhaustive test, but a basic check)
  it('should generate different IDs for different lengths.', () => {
    // Arrange
    const length1 = 5
    const length2 = 10
    const expectedLength1 = length1
    const expectedLength2 = length2

    // Act
    const result1 = generateId(length1)
    const result2 = generateId(length2)

    // Assert
    expect(result1.length).toBe(expectedLength1)
    expect(result2.length).toBe(expectedLength2)
    expect(result1).not.toBe(result2) // Basic check for randomness
  })

  // Test case: Randomness check (not an exhaustive test, but a basic check)
  it('should generate different IDs for the same length.', () => {
    // Arrange
    const length = 5
    const expectedLength = length
    const iterations = 100 // Number of times to run the test

    // Act & Assert
    const results: string[] = []
    for (let i = 0; i < iterations; i++) {
      const result = generateId(length)
      expect(result.length).toBe(expectedLength)
      results.push(result)
    }

    // Check if all generated IDs are unique
    expect(new Set(results).size).toBe(iterations)
  })
})
