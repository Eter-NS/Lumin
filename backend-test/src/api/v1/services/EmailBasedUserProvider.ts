import { DatabaseTools } from '../database/DatabaseTools'
import { User, UserProvider } from '../types/UserProvider'
import { Connection, Table } from '@lancedb/lancedb'
import crypto, { createHash } from 'node:crypto'

type StateResponse<T> = { state: 'success'; user: T } | { state: 'failure'; error: Error }

export class EmailBasedUserProvider implements UserProvider {
  #USERS_TABLE_NAME = 'users'
  private _dbTools: DatabaseTools

  constructor(private dbConnection: Connection) {
    this._dbTools = new DatabaseTools(this.dbConnection)
  }

  async register(email: string, password: string): Promise<StateResponse<User>> {
    const SELECTED_COLUMN = 'email'
    const usersTable = await this._dbTools.openTable(this.#USERS_TABLE_NAME)
    const hasDuplicateEmail = await this._dbTools.searchForDuplicates(
      usersTable,
      SELECTED_COLUMN,
      email
    )

    if (hasDuplicateEmail) {
      return {
        state: 'failure',
        error: new Error(
          'There is currently a user with corresponding email, please choose the other email'
        ),
      }
    }

    const payload = { email, password }

    try {
      const embeddingFunction = this._dbTools.getEmbeddingsFunction('ollama')
      const embeddings = await this._dbTools.createEmbeddings<User>(embeddingFunction, payload)
      const user = await this._dbTools.writeToDatabase<User>(usersTable, embeddings, payload)

      return { state: 'success', user }
    } catch (error) {
      if (error instanceof Error) {
        return { state: 'failure', error }
      }

      throw error
    }
  }

  async login(email: string, password: string): Promise<StateResponse<User>> {
    const usersTable = await this._dbTools.openTable(this.#USERS_TABLE_NAME)

    const user = await this._getUser(usersTable, {
      userMetadata: { email, password },
    })

    if (!user) {
      return {
        state: 'failure',
        error: new Error('No user found with given credentials'),
      }
    }

    return { state: 'success', user }
  }

  async logout(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async patchUser(user: {
    name?: string | undefined
    email?: string | undefined
    password?: string | undefined
  }): Promise<{ state: 'success' } | { state: 'failure'; error: Error }> {
    throw new Error('Method not implemented.')
  }

  async deleteUser(): Promise<{ state: 'success' } | { state: 'failure'; error: Error }> {
    throw new Error('Method not implemented.')
  }

  private async _getUser(
    usersTable: Table,
    findBy: {
      id?: string
      userMetadata?: { email: string; password: string }
    }
  ): Promise<User> {
    if (findBy.id) {
      return (await this._dbTools.getFromTable<User>(usersTable, `id = ${findBy.id}`))[0]
    }

    if (findBy.userMetadata) {
      /*
			TODO: Add the hashing mechanism for email and password before sending query to DB
			*/
      const { email, password } = findBy.userMetadata

      const hash = createHash('sha256')

      const hashedEmail = hash.write(email)
      const hashedPassword = hash.write(password)

      return (
        await this._dbTools.getFromTable<User>(
          usersTable,
          `email = ${hashedEmail} AND password = ${hashedPassword}`
        )
      )[0]
    } else {
      throw new Error('No option selected')
    }
  }
}
