import { z } from 'zod'
import { STATIC_ERROR_CODES_KEYS } from '../../types/staticErrorCodes'

export const uuid = z
  .string()
  .length(20, { message: 'no-userId' satisfies STATIC_ERROR_CODES_KEYS })
