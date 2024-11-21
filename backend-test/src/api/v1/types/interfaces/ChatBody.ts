import { Message } from 'ollama'

export interface ChatBody {
  uuid: string
  chatId?: string
  messages: Message[]
  model: string
  stream?: boolean
}
