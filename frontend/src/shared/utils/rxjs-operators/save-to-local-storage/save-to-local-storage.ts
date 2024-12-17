import { LocalStorageController } from '@lumin/shared/local-storage-controller/local-storage-controller.service'
import { MonoTypeOperatorFunction, tap } from 'rxjs'

export function saveToLocalStorage<T>(
  service: LocalStorageController,
  token: string
): MonoTypeOperatorFunction<T> {
  return tap((value) => {
    service.set(token, value)
  })
}
