import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from 'oidc-client-ts'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const role = computed(() => user.value?.profile?.role || 'guest')

  const permissions = computed(() =>
    (user.value?.profile?.permissions as string[] | undefined) ?? []
  )

  function setUser(u: User | null) {
    user.value = u
  }

  return {
    user,
    role,
    permissions,
    setUser,
  }
})
