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
import { APP_CONFIG, APP_CONFIG_VALUE } from '@lumin/shared/app-config/app-config.token'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { LoggerService } from '@lumin/shared/logger/logger.service'
import { loggerServiceFactory } from '@lumin/shared/logger/loggerService.factory'

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay(), withI18nSupport()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(withFetch()),
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy,
    },
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
    {
      provide: LoggerService,
      useFactory: loggerServiceFactory,
      deps: [APP_CONFIG],
    },
  ],
}
