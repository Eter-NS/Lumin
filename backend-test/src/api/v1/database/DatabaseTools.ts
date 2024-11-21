import { Connection, Table } from '@lancedb/lancedb'
import { getRegistry, EmbeddingFunction } from '@lancedb/lancedb/dist/embedding'

export class DatabaseTools {
  constructor(private _dbConnection: Connection) {}

  async openTable(tableName: string) {
    return this._dbConnection.openTable(tableName)
  }

  async searchForDuplicates(table: Table, column: string, value: string): Promise<number> {
    return (await table.search(value, 'fts', column).limit(1).toArray()).length
  }

  getEmbeddingsFunction(provider: string) {
    return getRegistry().get(provider)?.create({ model: 'nomic-embed-text' }) as EmbeddingFunction
  }

  async writeToDatabase<T>(
    table: Table,
    embeddings: number[][] | Float32Array[] | Float64Array[],
    payload: T
  ) {
    table.add([{ vector: embeddings, ...payload }])
    return payload
  }

  createEmbeddings<T>(embeddingFunction: EmbeddingFunction, payload: T) {
    return embeddingFunction.computeSourceEmbeddings([payload])
  }

  async getFromTable<T>(
    table: Table,
    filterQuery: string,
    options?: { selectedColumns?: string[]; limit?: number }
  ): Promise<T[]> {
    if (options?.selectedColumns?.length && options?.limit) {
      return table
        .query()
        .select(options.selectedColumns)
        .where(filterQuery)
        .limit(options.limit)
        .toArray() as Promise<T[]>
    }

    if (options?.selectedColumns?.length) {
      return table.query().select(options.selectedColumns).where(filterQuery).toArray() as Promise<
        T[]
      >
    }

    if (options?.limit) {
      return table.query().select('*').where(filterQuery).limit(options.limit).toArray() as Promise<
        T[]
      >
    }

    return table.query().where(filterQuery).toArray() as Promise<T[]>
  }
}
