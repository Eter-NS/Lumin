import { inject, Injectable, Injector, ProviderToken } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class LazyInject {
  private injector = inject(Injector)

  async get<T>(providerLoader: () => Promise<ProviderToken<T>>) {
    return this.injector.get(await providerLoader())
  }
}
