import OidcService from './oidcService'

export default class JwtService {
  axiosIns: any = null

  constructor(axiosIns: any) {
    this.axiosIns = axiosIns

    this.axiosIns.interceptors.request.use(
      async (config: any) => {
        const token = await OidcService.getAccessToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: any) => Promise.reject(error),
    )

    this.axiosIns.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        if (error.response && error.response.status === 401) {
          try {
            const user = await OidcService.signinSilent()
            if (user) {
              error.config.headers.Authorization = `Bearer ${user.access_token}`
              return this.axiosIns(error.config)
            }
          } catch (err) {
            console.error('Silent renew failed, redirecting to login')
            OidcService.signinRedirect()
          }
        }
        return Promise.reject(error)
      },
    )
  }
}
