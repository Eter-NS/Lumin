import { Injectable } from '@angular/core'
import { LoggerService } from '../logger/logger.service'
import { LogLevel } from '@lumin/shared/models/logLevel.type'

@Injectable()
export class DevelopmentLoggerService implements LoggerService {
  #consoleMethods: Record<LogLevel, keyof Console> = {
    info: 'info',
    log: 'log',
    warning: 'warn',
    error: 'error',
  }

  log(level: LogLevel, message: string): void {
    const method = this.#consoleMethods[level]

    if (method) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(console as any)[method](message)
    } else {
      console.log(message)
    }
  }
}
