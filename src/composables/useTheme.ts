// src/composables/useTheme.ts
import { ref, onMounted, watchEffect } from 'vue'

export function useTheme() {
  const isDark = ref(false)
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
