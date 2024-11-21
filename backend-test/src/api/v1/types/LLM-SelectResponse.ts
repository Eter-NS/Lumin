import { LLM_PROMPT_KEYS } from './LlmPromptKeys'
import { ErrorBody } from './interfaces/errorBody'

export type LLMSelectResponse =
  | { state: 'success'; chatId: string; selectedModel: LLM_PROMPT_KEYS }
  | ErrorBody
