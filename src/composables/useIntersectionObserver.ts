import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'

export interface UseIntersectionObserverOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
  onIntersect?: (entry: IntersectionObserverEntry) => void
}


/**
 * Hook para observar la intersección de un elemento con el viewport.
 * @param target Elemento a observar.
 * @param options Opciones del observer.
 * @returns Estado de intersección del elemento.
 * @example 
 * import { useIntersectionObserver } from '@/composables/useIntersectionObserver'
    const boxRef = ref<HTMLElement | null>(null)
    const { isIntersecting } = useIntersectionObserver(boxRef, {
      threshold: 0.5,
      onIntersect: (entry) => {
        console.log('Intersectó al 50%', entry)
      },
      once: false,
    })

 */
export function useIntersectionObserver(
  target: Ref<Element | null>,
  options: UseIntersectionObserverOptions = {}
) {
  const isIntersecting = ref(false)
  let observer: IntersectionObserver | null = null

  const stopObserver = () => {
    if (observer && target.value) {
      observer.unobserve(target.value)
      observer.disconnect()
    }
  }

  const startObserver = () => {
    if (!target.value) return

    observer = new IntersectionObserver(([entry]) => {
      isIntersecting.value = entry.isIntersecting

      if (entry.isIntersecting && options.onIntersect) {
        options.onIntersect(entry)
      }

      if (entry.isIntersecting && options.once) {
        stopObserver()
      }
    }, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0,
    })

    observer.observe(target.value)
  }

  onMounted(() => {
    if (target.value) {
      startObserver()
    }
  })

  onUnmounted(() => {
    stopObserver()
  })

  watch(target, (el, _, onCleanup) => {
    stopObserver()
    if (el) startObserver()
    onCleanup(() => stopObserver())
  })

  return {
    isIntersecting,
  }
}
