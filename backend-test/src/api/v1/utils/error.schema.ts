import { z } from 'zod'

export const ErrorSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
})
