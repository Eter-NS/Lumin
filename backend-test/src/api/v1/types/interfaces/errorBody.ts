import { DYNAMIC_ERROR_KEYS } from '../dynamicErrorKeys'
import { STATIC_ERROR_CODES_KEYS, STATIC_ERROR_CODES } from '../staticErrorCodes'

/**
 * {code} - - use 'unknown' value only for unknown cases that does not exist in ERROR_CODES dictionary.
 * {message} - use string value only for unknown cases that does not exist in ERROR_CODES dictionary.
 */
export interface ErrorBody {
  state: 'failure'
  code: STATIC_ERROR_CODES_KEYS | DYNAMIC_ERROR_KEYS | 'unknown'
  message: (typeof STATIC_ERROR_CODES)[STATIC_ERROR_CODES_KEYS] | string
}
