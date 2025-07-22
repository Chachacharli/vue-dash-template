import type { AxiosInstance } from 'axios'

/*
    * Base Axios Interceptor
    * Configures request and response interceptors for the Axios instance.
    * Handles token management and error logging.
*/

export function setupAxiosInterceptors(axios: AxiosInstance) {
  // Interceptor de request
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => {
      console.error('❌ Error en request:', error)
      return Promise.reject(error)
    }
  )

  // Interceptor de response
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('❌ Error en response:', error)

      if (error.response?.status === 401) {
        // Lógica de redirección o limpieza de sesión
        console.warn('⚠️ Token expirado o no autorizado')
      }

      return Promise.reject(error)
    }
  )
}
