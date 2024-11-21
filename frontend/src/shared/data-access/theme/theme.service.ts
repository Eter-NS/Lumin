import { inject, Injectable, PLATFORM_ID } from '@angular/core'
import { LocalStorageController } from '../local-storage-controller/local-storage-controller.service'
import {
  BehaviorSubject,
  combineLatestWith,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
} from 'rxjs'
import { BrowserTheme } from 'shared/utils/models/browserTheme.type'
import { AppTheme } from 'shared/utils/models/appTheme.type'
import { saveToLocalStorage } from 'shared/utils/rxjs-operators/save-to-local-storage/save-to-local-storage'
import { BreakpointObserver } from '@angular/cdk/layout'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { isPlatformBrowser } from '@angular/common'

@Injectable({ providedIn: 'root' })
export class ThemeService {
  #observerService = inject(BreakpointObserver)
  #localStorage = inject(LocalStorageController)
  #platform = inject(PLATFORM_ID)

  #QUERY = '(prefers-color-scheme: dark)' as const
  #THEME_TOKEN = 'APP_THEME' as const

  private _browserTheme$: Observable<BrowserTheme> = this.#observerService
    .observe(this.#QUERY)
    .pipe(
      map((e) => (e.matches ? 'dark' : 'light')),
      shareReplay({ bufferSize: 1, refCount: true })
    )

  private readonly _themeSubject = new BehaviorSubject<AppTheme>('auto')
  readonly theme$: Observable<BrowserTheme> = this._themeSubject.asObservable().pipe(
    distinctUntilChanged(),
    saveToLocalStorage(this.#localStorage, this.#THEME_TOKEN),
    combineLatestWith(this._browserTheme$),
    map(([appTheme, browserTheme]) => {
      if (appTheme === 'auto') {
        return browserTheme
      }

      return appTheme
    })
  )

  constructor() {
    if (isPlatformBrowser(this.#platform)) {
      this._initializeClientTheme()
    }

    this._browserTheme$.pipe(takeUntilDestroyed()).subscribe()
  }

  selectNewTheme(newTheme: AppTheme) {
    this._themeSubject.next(newTheme)
  }

  private _initializeClientTheme() {
    const theme = this.#localStorage.get<AppTheme>(this.#THEME_TOKEN)

    if (theme) {
      this._themeSubject.next(theme)
    }
  }
}
