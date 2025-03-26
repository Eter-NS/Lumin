import { Injectable } from '@angular/core'

/**
 * Represents a value stored in the image cache.
 */
export interface ImageCacheValue {
  /**
   * The URL of the image.
   */
  url: string

  /**
   * The last modified timestamp of the image file.
   */
  lastModified: number
}

@Injectable({
  providedIn: 'root',
})
export class ImageCacheService {
  /**
   * An array of valid image file extensions.
   */
  readonly IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']

  readonly #imageCache = new Map<string, ImageCacheValue>()

  /**
   * Retrieves a value from the cache using the specified key.
   *
   * @param key The key to use for retrieving the value.
   * @returns The value associated with the key, or undefined if the key is not found.
   */
  get(key: string): ImageCacheValue | undefined {
    if (typeof key !== 'string') {
      console.warn(`Expected a string, received: ${JSON.stringify(key)}`)
      return undefined
    }

    return this.#imageCache.get(key)
  }

  /**
   * Generates a unique key based on the file's name, size, and last modified timestamp.
   *
   * @param file The file to generate a key for.
   * @returns A unique key representing the file or undefined if an error occurs.
   */
  generateUniqueKey(file: File): string | undefined {
    if (!(file instanceof File)) {
      console.warn(`Expected File object, received: ${JSON.stringify(file)}`)
      return undefined
    }

    return `${file.name}-${file.size}-${file.lastModified}`
  }

  /**
   * Adds or updates a value in the cache using the specified key.
   *
   * @param key The key to use for adding or updating the value.
   * @param fileData The value to add or update in the cache.
   */
  push(key: string, fileData: ImageCacheValue): void {
    if (typeof key !== 'string') {
      throw new Error(`Expected key to be a string, received: ${JSON.stringify(key)}`)
    } else if (key === '') {
      throw new Error('Key cannot be empty')
    } else if (!fileData || !(fileData.lastModified || fileData.url)) {
      throw new Error(
        `Expected value to be an object with properties \`lastModified\` and \`url\`, received: ${JSON.stringify(fileData)}`
      )
    }

    this.#imageCache.set(key, fileData)
  }
}
