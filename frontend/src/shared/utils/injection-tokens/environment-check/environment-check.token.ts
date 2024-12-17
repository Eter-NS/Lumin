import { isPlatformBrowser, isPlatformServer } from '@angular/common'
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core'

export interface EnvironmentCheck {
  isPlatformBrowser(): boolean
  isPlatformServer(): boolean
}

export const EnvironmentCheckToken = new InjectionToken<EnvironmentCheck>(
  'EnvironmentInjectionToken',
  {
    providedIn: 'root',
    factory() {
      const platform = inject(PLATFORM_ID)

      return {
        isPlatformBrowser: () => isPlatformBrowser(platform),
        isPlatformServer: () => isPlatformServer(platform),
      }
    },
  }
)
