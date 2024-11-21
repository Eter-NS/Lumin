import { z } from 'zod'
import { STATIC_ERROR_CODES_KEYS } from '../../types/staticErrorCodes'

export const chatId = z
  .string()
  .length(20, { message: 'no-chatId' satisfies STATIC_ERROR_CODES_KEYS })
