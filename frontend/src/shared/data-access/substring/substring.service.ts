import { Injectable } from '@angular/core'

export interface SubstringCacheValue {
  name: string
  truncated: boolean
}

type inputText = string
type endIndex = number

export type SubstringCacheKey = `${inputText}-${endIndex}`

@Injectable({
  providedIn: 'root',
})
export class SubstringService {
  readonly #substringCache = new Map<string, SubstringCacheValue>()

  get(key: SubstringCacheKey): SubstringCacheValue | undefined {
    return this.#substringCache.get(key)
  }

  push(key: SubstringCacheKey, computedStringData: SubstringCacheValue) {
    this.#substringCache.set(key, computedStringData)
  }

  computeSubstring(
    name: string,
    endIndex: number
  ): { accessKey: SubstringCacheKey; data: SubstringCacheValue } {
    const isLengthLessThanEndIndex: boolean = name.length <= endIndex
    const substring: string = isLengthLessThanEndIndex ? name : name.substring(0, endIndex)

    const accessKey: SubstringCacheKey = `${name}-${endIndex}`
    const data = { name: substring, truncated: !isLengthLessThanEndIndex }

    return {
      accessKey,
      data,
    }
  }
}
