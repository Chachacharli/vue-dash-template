import { UserManager } from 'oidc-client-ts'
import { OIDC_CONFIG } from '@/@core/oidc/oidcConfig'

export const userManager = new UserManager(OIDC_CONFIG)
