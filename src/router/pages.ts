import NotFound from '@/views/pages/NotFound.vue'
import SingIn from '@/views/pages/SingIn.vue'
import LoginPage from '@/views/pages/LoginPage.vue'
import LoginCallbackPage from '@/views/pages/LoginCallbackPage.vue'
import LogoutCallbackPage from '@/views/pages/LogoutCallbackPage.vue'

export const PAGES = [
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { layout: 'flat' } },
  { path: '/sing-in', component: SingIn, meta: { layout: 'flat' } },
  { path: '/login', component: LoginPage, meta: { layout: 'flat' } },
  { path: '/login-callback', component: LoginCallbackPage, meta: { layout: 'flat' } },
  { path  : '/logout-callback', component: LogoutCallbackPage, meta: { layout: 'flat' } },
]
