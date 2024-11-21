import { ErrorBody } from './interfaces/errorBody'

export type LLMSingleGenerateResponse = { state: 'success'; data: string } | ErrorBody
