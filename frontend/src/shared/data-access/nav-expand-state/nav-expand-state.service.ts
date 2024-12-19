import { effect, EffectRef, inject, Injectable, OnDestroy, signal } from '@angular/core'
import { LocalStorageController } from '../local-storage-controller/local-storage-controller.service'
import { EnvironmentCheckToken } from '@lumin/shared/injection-tokens/environment-check/environment-check.token'

interface ExpandState {
  state: boolean
}

@Injectable({
  providedIn: 'root',
})
export class NavExpandStateService implements OnDestroy {
  #localStorage = inject(LocalStorageController)
  #environmentCheck = inject(EnvironmentCheckToken)

  readonly #NAV_EXPAND_STATE_TOKEN = 'NAV_EXPAND'
  expand = signal<boolean>(true)
  private _saveChangeToStorageRef?: EffectRef

  constructor() {
    if (this.#environmentCheck.isPlatformBrowser()) {
      this._createConnectionToStorage()
    }
  }

  ngOnDestroy(): void {
    this._saveChangeToStorageRef?.destroy()
  }

  private _createConnectionToStorage() {
    this._loadStateFromStorage()
    this._setupEffectForSavingState()
  }

  private _loadStateFromStorage() {
    const valueFromStorage = this.#localStorage.get<ExpandState>(this.#NAV_EXPAND_STATE_TOKEN)

    console.log('valueFromStorage', valueFromStorage)
    console.log('typeof valueFromStorage', typeof valueFromStorage)

    if (valueFromStorage) {
      this.expand.set(valueFromStorage.state)
    }
  }

  private _setupEffectForSavingState() {
    if (!this._saveChangeToStorageRef) {
      this._saveChangeToStorageRef = effect(() => {
        this.#localStorage.set(this.#NAV_EXPAND_STATE_TOKEN, { state: this.expand() })
      })
    }
  }
}
