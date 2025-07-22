import { useAuthStore } from '@/stores/authStore'

/**
 * Composable para manejar permisos basados en roles y permisos del usuario.
 * @returns can - Función que verifica si el usuario tiene uno de los roles especificados.
 * @returns hasPermission - Función que verifica si el usuario tiene un permiso específico.
 */
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
