export interface User {
  userId?: string
  name?: string
  email?: string
  password?: string
  jwtToken?: string
}

type PatchUser = Omit<User, 'userId' | 'jwtToken'>

type UserState = { state: 'success'; user: User } | { state: 'failure'; error: Error }

type UserUpdate = { state: 'success' } | { state: 'failure'; error: Error }

export abstract class UserProvider {
  abstract register(email: string, password: string): Promise<UserState>

  abstract login(email: string, password: string): Promise<UserState>

  abstract logout(): Promise<void>

  abstract patchUser(user: PatchUser): Promise<UserUpdate>

  abstract deleteUser(): Promise<UserUpdate>
}
