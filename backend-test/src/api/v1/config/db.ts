import { config } from 'dotenv'
import * as lance from '@lancedb/lancedb'

config()

const dbLocation = process.env.Database_Location

if (!dbLocation) {
  throw new Error('No Database_Location variable provided!')
}

export const dbConnection = await lance.connect(dbLocation as string)

/**
 * @description Use it only when shutting down the server
 */
export function closeDbConnection() {
  if (dbConnection) {
    dbConnection.close()
  }
}
