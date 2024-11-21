import { UserProvider } from '../types/UserProvider'

export class UserAuthenticationService {
  #provider: UserProvider

  constructor(provider: UserProvider) {
    this.#provider = provider
  }

  register(email: string, password: string) {
    return this.#provider.register(email, password)
  }

  login(email: string, password: string) {
    return this.#provider.login(email, password)
  }

  logout() {
    return this.#provider.logout()
  }

  patchUserInformation<T extends Parameters<UserProvider['patchUser']>>(
    ...args: T
  ): ReturnType<UserProvider['patchUser']> {
    return this.#provider.patchUser(...(args as Parameters<UserProvider['patchUser']>))
  }
}
