import { Request, Response } from 'express'
import { LLMSelectResponse } from '../../types/LLM-SelectResponse'
import { sendError } from '../../services/sendError'
import { LLM_PROMPTS } from '../../config/LLM-Prompts'
import { ChangeModelRequestSchema } from '../../models/ChangeModel'
import { LLM_PROMPT_KEYS } from '../../types/LlmPromptKeys'

/**
 * Changes the LLM model for an existing chat
 */
export const changeChatModel = async (req: Request, res: Response) => {
  const parsedBody = ChangeModelRequestSchema.safeParse(req.body)

  if (parsedBody.error || !parsedBody.data) {
    console.error('changeChatModel error:', parsedBody.error)

    sendError(res, 400, { codeMessage: 'no-userId' })
    return
  }

  const { uuid, chatId, model } = parsedBody.data

  try {
    await changeModelForChat(uuid, chatId, model)

    res.json({
      state: 'success',
      selectedModel: model,
      chatId: chatId,
    } satisfies LLMSelectResponse)
  } catch (err) {
    sendError(res, 400, { codeMessage: 'invalid-model' })
    return
  }
}

async function changeModelForChat(uuid: string, chatId: string, model: LLM_PROMPT_KEYS) {
  const prompt = LLM_PROMPTS[model]

  // Use db connection to search for user
  // query for chatId
  // update selected model
  // Close transaction
}
