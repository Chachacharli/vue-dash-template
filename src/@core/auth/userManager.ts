import { UserManager } from 'oidc-client-ts'
import { OIDC_CONFIG } from '@/@core/oidc/oidcConfig'

const userManager = new UserManager(OIDC_CONFIG)

userManager.events.addSilentRenewError((err) => {
  console.error('Silent renew failed:', err)
})

export default userManager 

