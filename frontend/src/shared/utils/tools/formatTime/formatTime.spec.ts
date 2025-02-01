// formatTime.spec.ts
import { formatTime } from './formatTime'

describe('formatTime function', () => {
  it('should return null when given null input', () => {
    // Arrange
    const time = null
    const expectedOutput = null

    // Act
    const result = formatTime(time)

    // Assert
    expect(result).toBe(expectedOutput)
  })

  it('should return null when given undefined input', () => {
    // Arrange
    const time = undefined
    const expectedOutput = null

    // Act
    const result = formatTime(time)

    // Assert
    expect(result).toBe(expectedOutput)
  })

  it('should return null when given a negative number', () => {
    // Arrange
    const time = -17
    const expectedOutput = null

    // Act
    const result = formatTime(time)

    // Assert
    expect(result).toBe(expectedOutput)
  })

  it('should format seconds below 10 correctly', () => {
    // Arrange
    const time = 9
    const expectedOutput = '00:09'

    // Act
    const result = formatTime(time)

    // Assert
    expect(result).toBe(expectedOutput)
  })

  it('should format seconds above 10 correctly', () => {
    // Arrange
    const time = 55
    const expectedOutput = '00:55'

    // Act
    const result = formatTime(time)

    // Assert
    expect(result).toBe(expectedOutput)
  })

  it('should format minutes and seconds correctly when minutes are below 10', () => {
    // Arrange
    const time = 60 * 1 + 5
    const expectedOutput = '01:05'

    // Act
    const result = formatTime(time)

    // Assert
    expect(result).toBe(expectedOutput)
  })

  it('should format minutes and seconds correctly when minutes are above 10', () => {
    // Arrange
    const time = 60 * 15 + 5
    const expectedOutput = '15:05'

    // Act
    const result = formatTime(time)

    // Assert
    expect(result).toBe(expectedOutput)
  })

  it('should format minutes and seconds correctly when minutes are exactly 10', () => {
    // Arrange
    const time = 60 * 10 + 5
    const expectedOutput = '10:05'

    // Act
    const result = formatTime(time)

    // Assert
    expect(result).toBe(expectedOutput)
  })

  it('should format minutes and seconds correctly when seconds are exactly 0', () => {
    // Arrange
    const time = 60 * 15 + 0
    const expectedOutput = '15:00'

    // Act
    const result = formatTime(time)

    // Assert
    expect(result).toBe(expectedOutput)
  })
})
