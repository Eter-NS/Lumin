import ollama from 'ollama'
import { Response } from 'express'
import { LLM_MODELS_DATA } from '../config/LLM-Models'
import { LLMChatResponse } from '../types/LLM-ChatResponse'
import { handleError } from './handleChatError'
import { ChatBody } from '../types/interfaces/ChatBody'

export async function handleStreamingMessage(
  res: Response,
  uuid: string,
  chatId: string | undefined,
  messages: ChatBody['messages'],
  { model, contextLength }: (typeof LLM_MODELS_DATA)[number],
  stream: true
): Promise<void> {
  res.setHeader('Content-Type', 'text/event-stream')

  try {
    const response = await ollama.chat({
      messages,
      model,
      options: {
        num_ctx: contextLength,
      },
      stream,
    })

    for await (const part of response) {
      res.write({
        stream,
        data: part.message.content,
        state: 'progress',
      } satisfies LLMChatResponse<string>)
    }

    // TODO: Save data to database

    res.json({
      stream,
      state: 'success',
    } satisfies LLMChatResponse<string>)
  } catch (err) {
    handleError(err, res, true)
  }
}

export async function handleNonStreamingMessage(
  res: Response,
  uuid: string,
  chatId: string | undefined,
  messages: ChatBody['messages'],
  { model, contextLength }: (typeof LLM_MODELS_DATA)[number]
): Promise<void> {
  try {
    const response = await ollama.chat({
      messages,
      model,
      options: {
        num_ctx: contextLength,
      },
    })

    // TODO: Save data to database

    res.json({
      stream: false,
      data: response.message.content,
      state: 'success',
    } satisfies LLMChatResponse<string>)
  } catch (err) {
    handleError(err, res, false)
  }
}
