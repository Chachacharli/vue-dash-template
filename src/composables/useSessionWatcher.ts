import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import userManager from '@/@core/auth/userManager'

export function useSessionWatcher() {
  const router = useRouter()

  let inactivityTimer: any
  const MAX_INACTIVITY = 30 * 60 * 1000 // 30 minutos

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer)
    inactivityTimer = setTimeout(() => {
      userManager.removeUser()
      router.push('/login')
    }, MAX_INACTIVITY)
  }

  onMounted(() => {
    resetInactivityTimer()
    window.addEventListener('mousemove', resetInactivityTimer)
    window.addEventListener('keydown', resetInactivityTimer)
  })

  onUnmounted(() => {
    clearTimeout(inactivityTimer)
    window.removeEventListener('mousemove', resetInactivityTimer)
    window.removeEventListener('keydown', resetInactivityTimer)
  })
}
