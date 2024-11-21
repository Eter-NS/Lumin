import { config } from 'dotenv'
import { readJsonFile } from '../utils/readJsonFile'
import { z } from 'zod'

config()

const PromptsSchema = z
  .record(z.string(), z.string(), {
    message: `The content of the prompts file should be an object with prompt as a value. Example: {"baseChat": "You're an intelligent chatbot who wants to help humanity."}`,
  })
  .readonly()

if (!process.env.SYSTEM_PROMPT_LOCATION) {
  throw new Error('No prompts file found.')
}

export const LLM_PROMPTS = PromptsSchema.parse(readJsonFile(process.env.SYSTEM_PROMPT_LOCATION))
