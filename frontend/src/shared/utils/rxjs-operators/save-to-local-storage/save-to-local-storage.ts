import { LocalStorageController } from '@lumin/shared/local-storage-controller/local-storage-controller.service'
import { MonoTypeOperatorFunction, tap } from 'rxjs'
import { AppTheme } from '../../models/appTheme.type'

export function saveToLocalStorage<T extends AppTheme>(
  service: LocalStorageController,
  token: string
): MonoTypeOperatorFunction<T> {
  return tap((theme) => {
    if (theme !== 'auto') {
      service.set(token, theme)
    }
  })
}
