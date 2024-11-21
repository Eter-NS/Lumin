import { config } from 'dotenv'
import { readJsonFile } from '../utils/readJsonFile'
import { z } from 'zod'
import { LlmModelSchema } from '../models/LlmModel'

config()

const ModelsSchema = z
  .array(
    z.object({
      codename: z.string(),
      model: LlmModelSchema.model,
      contextLength: z.number(),
    }),
    { message: `The models file content structure is not the array!` }
  )
  .readonly()

function readLmmModels() {
  if (!process.env.LLM_MODELS_LOCATION) {
    throw new Error('No models file found.')
  }

  return ModelsSchema.parse(readJsonFile(process.env.LLM_MODELS_LOCATION))
}

export const LLM_MODELS_DATA = readLmmModels()

export const LLM_MODELS_REGEXP = new RegExp(
  `^${LLM_MODELS_DATA.map((model) => model.codename).join('|')}:$`
)
