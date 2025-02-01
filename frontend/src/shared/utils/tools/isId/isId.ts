import { ID } from '@lumin/shared/models/id.type'

export function isId(value: unknown): value is ID {
  if (typeof value !== 'string') {
    return false
  }

  if (value.length !== 27) {
    return false
  }

  const alphanumericRegex = /^[a-zA-Z0-9]+$/

  return alphanumericRegex.test(value)
}
