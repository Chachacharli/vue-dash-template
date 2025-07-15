<template>
  <slot />
  <IdleModal
    :visible="showWarning"
    :countdown="countdown"
    @stayActive="handleStayActive"
  />
</template>

<script setup lang="ts">
import { watch, watchEffect } from 'vue'
import { useIdle } from '@/composables/useIdle'
import userManager from './userManager'
import { useRouter, useRoute } from 'vue-router'
import IdleModal from './IdleModal.vue'
import { IDLE_CONFIG } from './constasts'

const router = useRouter()
const route = useRoute()

const { isIdle, showWarning, countdown, resetTimers, stop } = useIdle()


// Observa cambios de ruta y activa el watcher solo si no está en las rutas excluidas
watchEffect(() => {
  const isExcluded = IDLE_CONFIG.WHITE_LIST.includes(route.path)

  if (isExcluded) {
    stop()
  } else {
    resetTimers()
  }
})

// Si se queda idle, cerrar sesión
watch(isIdle, (value) => {
  if (value) {
    userManager.removeUser()
    router.push('/login')
    showWarning.value = false
  }
})

// Si el usuario responde que sigue activo
const handleStayActive = () => {
  resetTimers()
}
</script>