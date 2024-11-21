import { Request, Response, NextFunction } from 'express'
import { sendError } from '../services/sendError'
import { logEvent } from '../services/logEvent'
import { ErrorSchema } from '../utils/error.schema'
import { dbConnection } from '../config/db'

export const databaseMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.db = dbConnection

    next()
  } catch (err) {
    const { data } = ErrorSchema.safeParse(err)

    if (!data) {
      console.error(err)
      return
    }

    logEvent({ type: 'error', message: data.message })
    sendError(res, 500, { codeMessage: 'db-connection' })
    return
  }
}
