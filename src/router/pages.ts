import NotFound from '@/views/pages/NotFound.vue'
import SingIn from '@/views/pages/SingIn.vue'
import LoginPage from '@/views/pages/LoginPage.vue'
import LoginCallbackPage from '@/views/pages/LoginCallbackPage.vue'
import LogoutCallbackPage from '@/views/pages/LogoutCallbackPage.vue'
import Unauthorized from '@/views/pages/Unauthorized.vue'

export const PAGES = [
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { layout: 'flat' } },
  { path: '/sing-in', component: SingIn, meta: { layout: 'flat' } },
  { path: '/login', name: 'login', component: LoginPage, meta: { layout: 'flat', requiresAuth: false } },
  { path: '/login-callback', component: LoginCallbackPage, meta: { layout: 'flat' } },
  { path: '/logout-callback', component: LogoutCallbackPage, meta: { layout: 'flat' } },
  { path: '/unauthorized', name: 'unauthorized', component: Unauthorized, meta: { layout: 'flat' } },
]
