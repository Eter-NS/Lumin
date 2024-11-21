import { z } from 'zod'
import { ChatBody } from '../types/interfaces/ChatBody'
import { LlmModelSchema } from './LlmModel'
import { LLM_MODELS_REGEXP } from '../config/LLM-Models'
import { STATIC_ERROR_CODES_KEYS } from '../types/staticErrorCodes'
import { uuid } from './base/Uuid'
import { chatId } from './base/chatId'

export const ChatSchema: z.ZodType<ChatBody> = z.object({
  uuid,
  chatId: chatId.optional(),
  messages: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
      images: z.array(z.instanceof(Uint8Array)).or(z.array(z.string())).optional(),
      tool_calls: z
        .array(
          z.object({
            function: z.object({
              name: z.string(),
              arguments: z.record(z.string(), z.any()),
            }),
          })
        )
        .optional(),
    })
  ),
  model: LlmModelSchema.model.regex(LLM_MODELS_REGEXP, {
    message: 'invalid-model' satisfies STATIC_ERROR_CODES_KEYS,
  }),
  stream: z.boolean().optional(),
})
