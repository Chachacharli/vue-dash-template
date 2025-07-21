import { useAuthStore } from '@/stores/authStore'

export function usePermissions() {
  const auth = useAuthStore()

  const can = (roles: string[]) => {
    const userRole = typeof auth.role === 'string' ? auth.role : ''
    return roles.includes(userRole)
  }

  const hasPermission = (perm: string) => {
    return auth.permissions.includes(perm)
  }

  return { can, hasPermission }
}
