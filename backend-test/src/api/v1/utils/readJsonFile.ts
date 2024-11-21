import { readFileSync } from 'fs'
import { ErrorSchema } from './error.schema'

export const readJsonFile = (filePath: string): unknown => {
  try {
    const buffer = readFileSync(filePath)
    const parsedFile = JSON.parse(buffer.toString('utf8'))

    return parsedFile
  } catch (err) {
    const { data } = ErrorSchema.safeParse(err)

    if (data?.code === 'ENOENT') {
      throw new Error(`File not found: '${filePath}'`)
    } else if (data?.code === `EACCES`) {
      throw new Error(`Permission denied: '${filePath}'`)
    } else {
      throw err
    }
  }
}
