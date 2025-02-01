/**
 * Generates a random ID of a specified length.
 * @param length The desired length of the random ID.
 * @returns A random ID of type T.
 * @throws Error if the length is less than 0.
 */
export function generateId<T extends string>(length: number): T {
  if (length < 1) {
    throw Error('Length must be greater than zero.')
  }

  const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result as T
}
