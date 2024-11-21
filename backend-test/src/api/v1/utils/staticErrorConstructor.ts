import { ErrorBody } from '../types/interfaces/errorBody'
import { STATIC_ERROR_CODES, STATIC_ERROR_CODES_KEYS } from '../types/staticErrorCodes'

export const staticErrorConstructor = (
  codeMessage: STATIC_ERROR_CODES_KEYS,
  messageForUnknownError: string
): Omit<ErrorBody, 'state'> => ({
  code: codeMessage || 'unknown',
  message: codeMessage ? STATIC_ERROR_CODES[codeMessage] : messageForUnknownError,
})
