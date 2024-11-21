import { Request, Response } from 'express'
import { RegisterUserSchema } from '../../models/RegisterUser'
import { sendError } from '../../services/sendError'

export const register = (req: Request, res: Response) => {
  const parsedBody = RegisterUserSchema.safeParse(req.body)

  if (parsedBody.error || !parsedBody.data) {
    console.error('changeChatModel error:', parsedBody.error)

    sendError(res, 400, {
      dynamicErrorConstructor: () => {
        return {
          code: 'invalid-value',
          message: parsedBody.error.message,
        }
      },
    })
    return
  }
}
