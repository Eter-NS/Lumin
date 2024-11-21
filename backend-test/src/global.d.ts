import * as lance from '@lancedb/lancedb'

declare global {
  namespace Express {
    export interface Request {
      db?: lance.Connection
    }
  }
}
