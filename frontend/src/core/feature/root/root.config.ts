import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router'
import { appRoutes } from './root.routes'
import { provideClientHydration, withEventReplay, withI18nSupport } from '@angular/platform-browser'
import { CustomTitleStrategy } from '@lumin/shared/custom-title-strategy/custom-title-strategy.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay(), withI18nSupport()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withViewTransitions(), withComponentInputBinding()),
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy,
    },
  ],
}
