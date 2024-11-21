import { Request, Response } from 'express'
import ollama from 'ollama'
import { LLMSingleGenerateResponse } from '../../types/LLM-SingleGenerateResponse'
import { logEvent } from '../../services/logEvent'
import { sendError } from '../../services/sendError'
import { ErrorSchema } from '../../utils/error.schema'
import { STATIC_ERROR_CODES_KEYS } from '../../types/staticErrorCodes'
import { GenerateTitleSchema } from '../../models/GenerateTitle'

export const generateTitle = async (req: Request, res: Response) => {
  const { data, error } = GenerateTitleSchema.safeParse(req.body)

  if (!data || error) {
    sendError(res, 400, {
      codeMessage: error.message as STATIC_ERROR_CODES_KEYS,
    })
    return
  }

  const { model, prompt } = data

  try {
    const titleResponse = await ollama.generate({
      model,
      prompt,
      system: `You're a great newspaper writer named Maximilian Fox who writes catching and informative headers for any text your manager gives you.
				You can use max two emojis.
				Header should be limited to 3-5 words.
				Remember, you answer ONLY with a header.`,
    })

    // TODO: Assign the title to the chat

    const response: LLMSingleGenerateResponse = {
      state: 'success',
      data: titleResponse.response,
    }
    res.json(response)
  } catch (err) {
    const { data } = ErrorSchema.safeParse(err)

    console.error(err)

    data?.message
      ? logEvent({ type: 'error', message: data.message })
      : sendError(res, 500, {
          messageForUnknownError: 'Oops... Something went wrong',
        })
  }
}
