import { inject, Injector } from '@angular/core'
import { ApiLoggerService } from '../api-logger/api-logger.service'
import { APP_CONFIG } from '../app-config/app-config.token'
import { DevelopmentLoggerService } from '../development-logger/development-logger.service'

export const loggerServiceFactory = () => {
  const config = inject(APP_CONFIG)
  const injector = inject(Injector)

  return config.production
    ? Injector.create({ providers: [ApiLoggerService], parent: injector }).get(ApiLoggerService)
    : Injector.create({ providers: [DevelopmentLoggerService], parent: injector }).get(
        DevelopmentLoggerService
      )
}
