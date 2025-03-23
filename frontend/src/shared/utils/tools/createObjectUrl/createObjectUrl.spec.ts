/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createObjectUrl } from './createObjectUrl'

Object.defineProperty(window, 'MediaSource', {
  writable: true,
  value: jest.fn(),
})

describe(`createObjectUrl`, () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it(`should return \`null\` if the value passed into the function is neither Blob or MediaSource`, () => {
    // Act
    const result = createObjectUrl(null as unknown as Blob)

    // Assert
    expect(result).toBeNull()
  })

  it(`should call URL.createObjectURL if the value passed into the function is a File, Blob or MediaSource object.`, () => {
    URL.createObjectURL = jest.fn()

    // Act
    createObjectUrl(new File(['Some text'], 'xyz.txt'))
    createObjectUrl(new MediaSource())

    // Assert
    expect(URL.createObjectURL).toHaveBeenCalledTimes(2)
  })
})
