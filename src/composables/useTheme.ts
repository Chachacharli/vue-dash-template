// src/composables/useTheme.ts
import { ref, onMounted, watchEffect } from 'vue'

// getting the initial theme from localStorage
const initialTheme = localStorage.getItem('theme') || 'light'
// setting the initial value of isDark based on localStorage
const isCurrentlyDark = ref(initialTheme === 'dark')

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
