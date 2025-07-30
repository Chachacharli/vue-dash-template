import { type RouteRecordRaw } from 'vue-router'
import BaseHome from '@/views/BaseHome.vue'
import ComponentsTemplate from '@/views/ComponentsTemplate.vue'
import ArchiveComponent from '@/views/ArchiveComponent.vue'
import FormsView from '@/views/FormsView.vue'
import { ROLES, ROLES_MAP } from '@/@core/auth/constasts'

const ROUTES: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: BaseHome,
    meta: {
      title: 'home',
      icon: 'home',
      roles: ROLES_MAP.ALL,
    },
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('@/features/customers/views/CustomersView.vue'),
    meta: {
      title: 'customers',
      icon: 'users',
      roles: ROLES_MAP.ALL,
    },
  },
  {
    path: '/customers/show/:id',
    name: 'customer',
    component: () => import('@/features/customers/views/CustomerView.vue'),
    meta: {
      title: 'customer',
      icon: 'users',
      roles: ROLES_MAP.ALL,
      isVisible: false
    },
  },
    {
    path: '/customers/create',
    name: 'customerCreate',
    component: () => import('@/features/customers/views/CustomerCreate.vue'),
    meta: {
      title: 'customer',
      icon: 'users',
      roles: ROLES_MAP.ALL,
      isVisible: false
    },
  },
  // {
  //   path: '/components',
  //   name: 'components',
  //   component: ComponentsTemplate,
  //   meta: {
  //     title: 'components',
  //     icon: 'layout',
  //     roles: ROLES_MAP.ALL
  //   },
  // },
  // {
  //   path: '/forms',
  //   name: 'forms',
  //   component: FormsView,
  //   meta: {
  //     title: 'forms',
  //     icon: 'layout',
  //     roles: ROLES_MAP.ALL
  //   },
  // },
  // {
  //   path: '/archive',
  //   name: 'archive',
  //   component: ArchiveComponent,
  //   meta: {
  //     title: 'archive',
  //     icon: 'archive',
  //     roles: ROLES_MAP.ALL
  //   },
  // },
]

export default ROUTES
