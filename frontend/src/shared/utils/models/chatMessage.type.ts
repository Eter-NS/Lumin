import { ID } from './id.type'

type Continent = string
type City = string

interface Message {
  chatId: ID
  text: string
  timestamp: number
  timezone: `${Continent}/${City}`
}

interface AssistantMessage extends Message {
  sender: 'assistant'
}

export interface UserMessage extends Message {
  sender: 'user'
}

export type ChatMessage = AssistantMessage | UserMessage
