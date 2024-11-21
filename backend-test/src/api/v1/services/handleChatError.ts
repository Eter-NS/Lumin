import { logEvent } from './logEvent'
import { sendError } from './sendError'
import { ErrorSchema } from '../utils/error.schema'
import { Response } from 'express'

export function handleError(err: unknown, res: Response, stream: boolean): void {
  console.warn(`stream - ${stream}`)
  console.error(err)

  const { data } = ErrorSchema.safeParse(err)

  if (!data) {
    console.error(err)
    return
  }

  logEvent({ type: 'error', message: data.message })
  sendError(res, 500, {
    messageForUnknownError: 'Error while processing chat response',
  })
}
