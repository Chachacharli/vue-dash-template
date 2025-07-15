import NotFound from '@/views/pages/NotFound.vue'
import SingIn from '@/views/pages/SingIn.vue'
import LoginPage from '@/views/pages/LoginPage.vue'

export const PAGES = [
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { layout: 'flat' } },
  { path: '/sing-in', component: SingIn, meta: { layout: 'flat' } },
  { path: '/login', component: LoginPage, meta: { layout: 'flat' } },
]
