<template>
  <slot />
</template>

<script lang="ts" setup>

import { provide, onMounted, ref } from 'vue'
import { userManager } from './userManager'
import { User } from 'oidc-client-ts'

const isAuthenticated = ref(false)
const user = ref<User | null>(null)

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
})

provide('auth', {
  isAuthenticated,
  user,
  login: () => userManager.signinRedirect(),
  logout: () => userManager.signoutRedirect(),
  refresh: () => userManager.signinSilent(),
})

</script>
