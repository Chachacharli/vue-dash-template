import { WebStorageStateStore } from 'oidc-client-ts'

const AUTORITY = 'https://identity.qa.scisa.com.mx/'

export const OIDC_CONFIG = {
  authority: AUTORITY,
  client_id: 'Framework',
  redirect_uri: `${window.location.origin}/auth/callback`,
  post_logout_redirect_uri: `${window.location.origin}/auth/logout-callback`,
  response_type: 'code',
  scope: 'openid profile email api offline_access',
  monitorSession: true,
  automaticSilentRenew: true,
  silent_redirect_uri: `${window.location.origin}/auth/silent-renew`,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
}

