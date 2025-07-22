// composables/useFetch.ts
import { ref, watchEffect } from 'vue'
import type { AxiosRequestConfig } from 'axios'
import axiosInstance from '@/services/axios/axiosInstance'

interface UseFetchOptions<Params = Record<string, any>> {
  params?: Params
  headers?: Record<string, string>
  immediate?: boolean
}

export function useFetch<T = any, Params = Record<string, any>>({ url, options = {} }: { url: string; options?: UseFetchOptions<Params> }) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetch = async () => {
    loading.value = true
    error.value = null
    try {
      const config: AxiosRequestConfig = {
        params: options.params,
        headers: options.headers,
      }

      const response = await axiosInstance.get<T>(url, config)
      data.value = response.data
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }

  if (options.immediate !== false) {
    watchEffect(() => {
        debugger
      fetch()
    })
  }

  return {
    data,
    loading,
    error,
    fetch,
  }
}
