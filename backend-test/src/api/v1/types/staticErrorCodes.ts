export const STATIC_ERROR_CODES = {
  'no-model-selected': 'No model has been selected',
  'no-prompt': 'No prompt has been sent',
  'no-chatId': 'No chat ID has been sent',
  'no-userId': 'No user ID has been sent',
  'invalid-model': `This model doesn't exist`,
  'db-connection': `Error while connecting to database`,
} as const

export type STATIC_ERROR_CODES_KEYS = keyof typeof STATIC_ERROR_CODES
