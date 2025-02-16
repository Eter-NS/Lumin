import { HttpClient } from '@angular/common/http'
import { DestroyRef, inject, Injectable } from '@angular/core'
import { APP_CONFIG } from '../app-config/app-config.token'
import { LoggerService } from '../logger/logger.service'
import { LogLevel } from '@lumin/shared/models/logLevel.type'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Injectable()
export class ApiLoggerService implements LoggerService {
  #http = inject(HttpClient)
  #config = inject(APP_CONFIG)
  #destroyRef = inject(DestroyRef)

  log(level: LogLevel, message: string) {
    this.#http
      .post<boolean>(this.#config.apiUrl + '/log', {
        level,
        message,
      })
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe()
  }
}
