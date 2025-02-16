import { InjectionToken } from '@angular/core'

export const exampleInjectionToken = new InjectionToken<{ name1: null }>(
  'An example injection token for testing purposes',
  {
    factory: () => ({
      name1: null,
    }),
  }
)
