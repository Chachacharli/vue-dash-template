import { createRouter, createWebHistory } from 'vue-router'

import ROUTES from './routes'
import { PAGES } from './pages'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...ROUTES, ...PAGES],
})

router.afterEach((to, from) => {


})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.user) {
    return next({ name: 'Login' })
  }

  /* Esto valida los roles en función a la ruta específica */
  const allowedRoles = to.meta.roles as string[] | undefined
  const userRole = typeof auth.role === 'string' ? auth.role : ''
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return next({ name: 'unauthorized' })
  }

  next()

})

export default router
