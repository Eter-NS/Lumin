import { DYNAMIC_ERROR_KEYS } from '../dynamicErrorKeys'

export interface DynamicError {
  code: DYNAMIC_ERROR_KEYS
  message: string
}
