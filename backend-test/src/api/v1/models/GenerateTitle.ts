import { z } from 'zod'
import { uuid } from './base/Uuid'
import { chatId } from './base/chatId'
import { STATIC_ERROR_CODES_KEYS } from '../types/staticErrorCodes'
import { LLM_MODELS_REGEXP } from '../config/LLM-Models'

export const GenerateTitleSchema = z.object({
  uuid,
  chatId,
  model: z
    .string({
      message: 'no-model-selected' satisfies STATIC_ERROR_CODES_KEYS,
    })
    .regex(LLM_MODELS_REGEXP, {
      message: 'invalid-model' satisfies STATIC_ERROR_CODES_KEYS,
    }),
  prompt: z.string({ message: 'no-prompt' satisfies STATIC_ERROR_CODES_KEYS }),
})
