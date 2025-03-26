import { ErrorHandler, inject, Injectable } from '@angular/core'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  #logger = inject(LoggerService)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    let message: string

    if (error instanceof Error) {
      message = error.message
    } else if (typeof error === 'string') {
      message = error
    } else if ('message' in error) {
      message = error.message
    } else {
      message = JSON.stringify(error, null, 2)
    }

    this.#logger.log('error', message)
  }
}
