import { LLM_MODELS_DATA } from '../../config/LLM-Models'
import { sendError } from '../../services/sendError'
import { Request, Response } from 'express'
import {
  handleNonStreamingMessage,
  handleStreamingMessage,
} from '../../services/handleChatMessages'
import { ChatBody } from '../../types/interfaces/ChatBody'
import { ChatSchema } from '../../models/Chat'

export const chat = async (req: Request, res: Response) => {
  const { data, error } = ChatSchema.safeParse(req.body)

  if (!data || error) {
    console.error('changeChatModel error:', error)

    sendError(res, 400, {
      messageForUnknownError: 'Error schema not defined yet',
    })
    return
  }

  const { uuid, chatId, messages, model, stream } = data
  const modelData = LLM_MODELS_DATA.find(({ codename }) => codename === model)

  if (!modelData) {
    throw new Error(`changeChatModel error: Model not found ${model}`)
  }

  await handleModelChat(res, uuid, chatId, messages, modelData, Boolean(stream))
}

async function handleModelChat(
  res: Response,
  uuid: string,
  chatId: string | undefined,
  messages: ChatBody['messages'],
  modelData: (typeof LLM_MODELS_DATA)[number],
  stream: boolean
): Promise<void> {
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  stream
    ? handleStreamingMessage(res, uuid, chatId, messages, modelData, stream)
    : handleNonStreamingMessage(res, uuid, chatId, messages, modelData)
}
