// src/composables/useTheme.ts
import { ref, onMounted, watchEffect } from 'vue'

// getting the initial theme from localStorage
const initialTheme = localStorage.getItem('theme') || 'light'
// setting the initial value of isDark based on localStorage
const isCurrentlyDark = ref(initialTheme === 'dark')

/**
 * Composable para manejar el tema oscuro/claro de la aplicación.
 * @returns isDark - Ref que indica si el tema actual es oscuro.
 * @returns toggleTheme - Función para alternar entre los temas oscuro y claro.
 */
export function useTheme() {
  const isDark = ref(isCurrentlyDark.value)
  watchEffect(() => {
    const className = 'dark'
    const element = document.documentElement

    if (isDark.value) {
      element.classList.add(className)
      localStorage.setItem('theme', 'dark')
    } else {
      element.classList.remove(className)
      localStorage.setItem('theme', 'light')
    }
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
}
