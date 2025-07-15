import { ref, onMounted, onUnmounted } from 'vue'

import { IDLE_CONFIG } from '@/@core/auth/constasts'
/**
 *
 * Formula para calcular el tiempo de inactividad:
 * * - Tiempo de inactividad = Tiempo actual - Última actividad registrada
 * * Ejemplo:
 * *   - Si la última actividad fue hace 10 minutos y el tiempo de inactividad es de 25 minutos, entonces:
 * *   - Tiempo de inactividad = 10 minutos
 * *   - Si el tiempo de inactividad supera los 25 minutos, se considera in
 * *   - Si el tiempo de inactividad es de 20 minutos, se muestra una advertencia.
 * *   - Si el usuario no interactúa durante los 20 minutos de advertencia, se considera inactivo.
 *
 **/

const IDLE_TIME = IDLE_CONFIG.IDLE_TIME * 60 * 1000 // 25 minutes
const WARNING_TIME = IDLE_CONFIG.WARNING_TIME * 60 * 1000 // 20 minutes

/**
 * useIdle composable to manage user idle state.
 * @param idleTime
 * @param warningTime
 */
export function useIdle(idleTime = IDLE_TIME, warningTime = WARNING_TIME) {
  const isIdle = ref(false)
  const showWarning = ref(false)
  const countdown = ref(warningTime / 1000)

  let idleTimer: ReturnType<typeof setTimeout>
  let warningTimer: ReturnType<typeof setTimeout>
  let countdownInterval: ReturnType<typeof setInterval>

  const resetTimers = () => {
    clearTimeout(idleTimer)
    clearTimeout(warningTimer)
    clearInterval(countdownInterval)

    showWarning.value = false
    isIdle.value = false
    countdown.value = warningTime / 1000

    idleTimer = setTimeout(() => {
      showWarning.value = true

      countdownInterval = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          isIdle.value = true
          clearInterval(countdownInterval)
        }
      }, 1000)

      warningTimer = setTimeout(() => {
        isIdle.value = true
      }, warningTime)
    }, idleTime)
  }

  const start = () => {
    ;['mousemove', 'keydown', 'click', 'scroll'].forEach((evt) =>
      window.addEventListener(evt, resetTimers),
    )
    resetTimers()
  }

  const stop = () => {
    clearTimeout(idleTimer)
    clearTimeout(warningTimer)
    clearInterval(countdownInterval)
    ;['mousemove', 'keydown', 'click', 'scroll'].forEach((evt) =>
      window.removeEventListener(evt, resetTimers),
    )
  }

  onMounted(start)
  onUnmounted(stop)

  return {
    isIdle,
    showWarning,
    countdown,
    resetTimers,
    stop,
  }
}
