import { createRouter, createWebHistory } from 'vue-router'

import ROUTES from './routes'
import { PAGES } from './pages'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/useUiStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...ROUTES, ...PAGES, { path: '/:pathMatch(.*)*', redirect: '/' }],
})

router.afterEach((to, from) => {
  const ui = useUiStore()

  if(to.name === 'login' || to.name === 'unauthorized') {
    ui.setLoading(false)
    return
  }
  // Esto añade una pequeña pausa para simular una carga
  setTimeout(() => ui.setLoading(false), 300)
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const ui = useUiStore()
  ui.setLoading(true)
  debugger
  // Revisar si el ususario está autenticado y si la ruta requiere autenticación (solo Login y Unauthorized no requieren autenticación)
  // Cambiar el to.meta.requiresAuth a !to.meta.requiresAuth para que todas las rutas requieran autenticación por defecto
  if (to.meta.requiresAuth && !auth.user) {
    if (to.name === 'login' || to.name === 'unauthorized') {
      return next()
    }
    return next({ name: 'login' })
  }

  /* Esto valida los roles en función a la ruta específica */
  const allowedRoles = to.meta.roles as string[] | undefined
  const userRole = typeof auth.role === 'string' ? auth.role : ''

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return next({ name: 'unauthorized' })
  }

  if (to.path === '/') {
    if (auth.user) {
      return next({ name: 'dashboard' })
    } else {
      return next({ name: 'login' })
    }
  }

  next()
})

export default router
