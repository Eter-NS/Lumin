import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class LocalStorageController {
  get<T>(key: string): T | null {
    const stringifiedValue = localStorage.getItem(key)

    return stringifiedValue === null ? null : (JSON.parse(stringifiedValue) as T)
  }

  has(key: string) {
    return Boolean(localStorage.getItem(key))
  }

  set(key: string, value: unknown) {
    if (typeof value === 'function') {
      throw new Error(`Tried to save a function named ${value.name} to LocalStorage`)
    }

    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
  }

  delete(key: string) {
    localStorage.removeItem(key)
  }
}
