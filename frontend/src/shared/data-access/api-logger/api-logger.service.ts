import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { APP_CONFIG } from '../app-config/app-config.token'
import { LoggerService } from '../logger/logger.service'
import { LogLevel } from '@lumin/shared/models/logLevel.type'

@Injectable()
export class ApiLoggerService implements LoggerService {
  #http = inject(HttpClient)
  #config = inject(APP_CONFIG)

  log(level: LogLevel, message: string) {
    return this.#http.post<boolean>(this.#config.apiUrl + '/log', {
      level,
      message,
    })
  }
}
