import { z } from 'zod'
import { LlmModelSchema } from './LlmModel'
import { chatId } from './base/chatId'
import { uuid } from './base/Uuid'

export const ChangeModelRequestSchema = z.object({
  uuid,
  chatId,
  model: LlmModelSchema.model,
})
