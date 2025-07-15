import type { Ref } from "vue"
import { inject } from "vue"

type AuthContext = {
  isAuthenticated: Ref<boolean>
  user: Ref<any>
  login: () => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

export function useAuth() {
  const context = inject<AuthContext>('auth')
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}