import { Request, Response } from 'express'

export const getChats = (req: Request, res: Response) => {
  res.send('get')
}
