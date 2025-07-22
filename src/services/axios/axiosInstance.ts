// lib/axiosInstance.ts
import axios from 'axios'
import { AXIOS_CONFIG } from './axiosConfig'
import { setupAxiosInterceptors } from './baseAxiosInterceptor'

const axiosInstance = axios.create({
  baseURL: AXIOS_CONFIG.baseUrl,
  timeout: AXIOS_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Puedes agregar interceptores aquí si lo necesitas
setupAxiosInterceptors(axiosInstance)

export default axiosInstance
