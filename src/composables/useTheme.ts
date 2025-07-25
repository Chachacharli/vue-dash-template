import { ref, readonly, watchEffect, onMounted } from 'vue'

const isDark = ref(false)

const updateHtmlClass = (value: boolean) => {
  const className = 'dark'
  const element = document.documentElement
  if (value) {
    element.classList.add(className)
    localStorage.setItem('theme', 'dark')
  } else {
    element.classList.remove(className)
    localStorage.setItem('theme', 'light')
  }
}

// Inicializar con el valor almacenado
const savedTheme = localStorage.getItem('theme')
isDark.value = savedTheme === 'dark'

// Aplicar clase al cargar
updateHtmlClass(isDark.value)

// Observar cambios futuros en la clase HTML (por si alguien la cambia directamente)
if (typeof window !== 'undefined') {
  const observer = new MutationObserver(() => {
    const html = document.documentElement
    const hasDark = html.classList.contains('dark')
    isDark.value = hasDark
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
}

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateHtmlClass(isDark.value)
  }

  return {
    isDark: readonly(isDark), // Global, reactivo y protegido
    toggleTheme,
  }
}
