export type LLMChatResponse<T> =
  | { stream: true; state: 'progress'; data: T }
  | { stream: true; state: 'success' }
  | { stream: false; state: 'success'; data: T }
