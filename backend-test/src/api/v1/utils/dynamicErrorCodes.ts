import { DynamicError } from '../types/interfaces/dynamicError'

export function createInvalidTypeError(
  property: string,
  expectedType: string,
  currentValue: unknown
): DynamicError {
  return {
    code: 'invalid-type',
    message: `Property ${property} must be a ${expectedType}, but it's currently a ${typeof currentValue}`,
  }
}

export function createInvalidValueError(
  property: string,
  expectedValue: string | string[],
  currentValue: unknown
): DynamicError {
  const expectedValues = formatExpectedValues(expectedValue)
  const type = extractType(currentValue, expectedValue)

  return {
    code: 'invalid-value',
    message: `Property '${property}' must be ${expectedValues}, but it's currently ${type}`,
  }
}

function formatExpectedValues(expectedValue: string | string[]): string {
  if (!Array.isArray(expectedValue)) {
    return `a ${expectedValue}`
  }

  return expectedValue
    .map((value, index, array) => {
      if (array.length === 1) return `'${value}'`
      if (index === array.length - 1) return `or '${value}'`
      if (index === array.length - 2) return `'${value}' `
      return `'${value}', `
    })
    .join('')
}

console.log(createInvalidValueError('test', ['a', 'b', 'c', 'd'], 'x'))

function extractType(currentValue: unknown, expectedType: string | string[]) {
  if (typeof currentValue === 'object') {
    if (Array.isArray(currentValue)) {
      return 'Array'
    } else if (currentValue instanceof Date) {
      return 'Date'
    } else if (currentValue === null) {
      return 'null'
    } else {
      return 'object'
    }
  }

  if (typeof currentValue === 'string') {
    return Array.isArray(expectedType) ? `'${currentValue}'` : 'string'
  }

  return typeof currentValue
}
