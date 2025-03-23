import { getFileExtension } from './getFileExtension'

describe(`getFileExtension`, () => {
  it(`should return null if the parameter is not an instance of File.`, () => {
    // Arrange
    const file = null

    // Act
    const result = getFileExtension(file as unknown as File)

    // Assert
    expect(result).toBeNull()
  })

  it(`should return the file extension if the File.name contains the extension.`, () => {
    // Arrange
    const file = new File([], 'example.txt', { type: 'text/plain' })

    // Act
    const result = getFileExtension(file)

    // Assert
    expect(result).toBe('txt')
  })

  it(`should return null if the MIME type is not recognized.`, () => {
    // Arrange
    const file = new File([], 'example', { type: 'application/octet-stream' })

    // Act
    const result = getFileExtension(file)

    // Assert
    expect(result).toBeNull()
  })

  it(`should handle file names with multiple dots correctly.`, () => {
    // Arrange
    const file = new File([], 'example.tar.gz', { type: 'application/x-tar-gz' })

    // Act
    const result = getFileExtension(file)

    // Assert
    expect(result).toBe('gz')
  })

  it(`should handle file names starting with a dot correctly.`, () => {
    // Arrange
    const file = new File([], '.htaccess', { type: 'text/plain' })

    // Act
    const result = getFileExtension(file)

    // Assert
    expect(result).toBe('htaccess')
  })

  it(`should return the correct extension for all possible outcomes from the switch statement in getFileExtension function.`, () => {
    // Arrange
    const testCases = [
      { file: new File([], 'example', { type: 'image/jpeg' }), expected: 'jpg' },
      { file: new File([], 'example', { type: 'image/png' }), expected: 'png' },
      { file: new File([], 'example', { type: 'image/gif' }), expected: 'gif' },
      { file: new File([], 'example', { type: 'image/bmp' }), expected: 'bmp' },
      { file: new File([], 'example', { type: 'image/webp' }), expected: 'webp' },
      { file: new File([], 'example', { type: 'application/pdf' }), expected: 'pdf' },
      { file: new File([], 'example', { type: 'application/msword' }), expected: 'doc' },
      {
        file: new File([], 'example', {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }),
        expected: 'docx',
      },
      { file: new File([], 'example', { type: 'application/vnd.ms-excel' }), expected: 'xls' },
      {
        file: new File([], 'example', {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
        expected: 'xlsx',
      },
      {
        file: new File([], 'example', { type: 'application/vnd.ms-powerpoint' }),
        expected: 'ppt',
      },
      {
        file: new File([], 'example', {
          type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        }),
        expected: 'pptx',
      },
      { file: new File([], 'example', { type: 'text/plain' }), expected: 'txt' },
      { file: new File([], 'example', { type: 'text/csv' }), expected: 'csv' },
      { file: new File([], 'example', { type: 'image/svg+xml' }), expected: 'svg' },
      { file: new File([], 'example', { type: 'application/json' }), expected: 'json' },
      { file: new File([], 'example', { type: 'application/xml' }), expected: 'xml' },
      { file: new File([], 'example', { type: 'video/mpeg' }), expected: 'mpeg' },
      { file: new File([], 'example', { type: 'video/mp4' }), expected: 'mp4' },
      { file: new File([], 'example', { type: 'video/webm' }), expected: 'webm' },
      { file: new File([], 'example', { type: 'audio/ogg' }), expected: 'ogg' },
      { file: new File([], 'example', { type: 'audio/wav' }), expected: 'wav' },
      { file: new File([], 'example', { type: 'audio/aac' }), expected: 'aac' },
    ]

    // Act & Assert
    testCases.forEach((testCase) => {
      const result = getFileExtension(testCase.file)
      expect(result).toBe(testCase.expected)
    })
  })
})
