import { UserManager, User } from 'oidc-client-ts'

import { OIDC_CONFIG } from './oidcConfig'

class OidcService {
  private manager = new UserManager(OIDC_CONFIG)

  getUser(): Promise<User | null> {
    return this.manager.getUser()
  }

  signinRedirect() {
    return this.manager.signinRedirect()
  }

  async signinRedirectCallback(): Promise<User> {
    return await this.manager.signinRedirectCallback()
  }

  signoutRedirect() {
    return this.manager.signoutRedirect()
  }

  async signoutRedirectCallback(): Promise<void> {
    await this.manager.signoutRedirectCallback()
  }

  async signinSilent(): Promise<User | null> {
    return await this.manager.signinSilent()
  }

  getAccessToken(): Promise<string | null> {
    return this.getUser().then((user) => user?.access_token || null)
  }

  isLoggedIn(): Promise<boolean> {
    return this.getUser().then((user) => !!user && !user.expired)
  }
}

export default new OidcService()
