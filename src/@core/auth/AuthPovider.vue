<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide, onMounted, ref } from 'vue'
import userManager from './userManager'
import { User } from 'oidc-client-ts'
import { useRouter } from 'vue-router'
import { useSessionWatcher } from '@/composables/useSessionWatcher'

const router = useRouter()

const isAuthenticated = ref(false)
const user = ref<User | null>(null)

function startSessionWatcher(logoutCallback: () => void) {
  userManager.events.addAccessTokenExpired(() => {
    console.warn('[Auth] Token expirado, cerrando sesión')
    logoutCallback()
  })

  userManager.events.addSilentRenewError((error) => {
    console.warn('[Auth] Silent renew falló, cerrando sesión', error)
    logoutCallback()
  })
}

const checkUser = async () => {
  const currentUser = await userManager.getUser()
  isAuthenticated.value = !!(currentUser && !currentUser.expired)
  user.value = currentUser
}

onMounted(() => {
  checkUser()
  userManager.events.addUserLoaded(() => checkUser())
  userManager.events.addUserUnloaded(() => checkUser())
  userManager.events.addAccessTokenExpired(() => checkUser())
  startSessionWatcher(() => {
    userManager.removeUser()
    isAuthenticated.value = false
    user.value = null
    router.push('/login')
  })
  useSessionWatcher()
})

provide('auth', {
  isAuthenticated,
  user,
  login: () => userManager.signinRedirect(),
  logout: () => userManager.signoutRedirect(),
  refresh: () => userManager.signinSilent(),
})
</script>
