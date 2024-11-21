import { Response } from 'express'
import { STATIC_ERROR_CODES_KEYS } from '../types/staticErrorCodes'
import { ErrorBody } from '../types/interfaces/errorBody'
import { DynamicError } from '../types/interfaces/dynamicError'
import { staticErrorConstructor } from '../utils/staticErrorConstructor'

interface ErrorCodeSignature {
  codeMessage?: STATIC_ERROR_CODES_KEYS
  dynamicErrorConstructor?: () => DynamicError
  messageForUnknownError?: string
}

export function sendError<T extends Response>(
  res: T,
  code: number,
  errorCodeSignature: ErrorCodeSignature
) {
  const { codeMessage, messageForUnknownError, dynamicErrorConstructor } = errorCodeSignature

  if (!codeMessage || !messageForUnknownError || !dynamicErrorConstructor) {
    throw new Error(
      'At least one of these options must be configured: codeMessage, dynamicErrorConstructor, or messageForUnknownError.'
    )
  }

  const errorInstance =
    (dynamicErrorConstructor && dynamicErrorConstructor()) ||
    staticErrorConstructor(codeMessage, messageForUnknownError)

  res.status(code).send({
    state: 'failure',
    ...errorInstance,
  } satisfies ErrorBody)
}
