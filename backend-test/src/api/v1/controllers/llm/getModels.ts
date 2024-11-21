import { Response } from 'express'
import { LLM_PROMPTS } from '../../config/LLM-Prompts'

export const getModels = async (_: unknown, res: Response) => {
  res.json({ data: Object.keys(LLM_PROMPTS) })
}
