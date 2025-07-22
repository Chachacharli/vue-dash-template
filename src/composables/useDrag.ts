import { ref, computed, onMounted, onUnmounted } from 'vue'

import type { Ref } from 'vue'

export interface DragOptions {
  threshold?: number
  onDragLeft?: () => void
  onDragRight?: () => void
  onDragUp?: () => void
  onDragDown?: () => void
}

export function useDrag(
  target: Ref<HTMLElement | null>,
  options: DragOptions = {}
) {
  const startX = ref(0)
  const startY = ref(0)
  const deltaX = ref(0)
  const deltaY = ref(0)
  const direction = ref<null | 'left' | 'right' | 'up' | 'down'>(null)
  const isDragging = ref(false)

  const threshold = options.threshold || 100

  const progress = computed(() => {
    const d = Math.max(Math.abs(deltaX.value), Math.abs(deltaY.value))
    return Math.min(d / threshold, 1)
  })

  const onMouseDown = (e: MouseEvent) => {
    isDragging.value = true
    startX.value = e.clientX
    startY.value = e.clientY
    deltaX.value = 0
    deltaY.value = 0
    direction.value = null
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return
    deltaX.value = e.clientX - startX.value
    deltaY.value = e.clientY - startY.value

    if (Math.abs(deltaX.value) > Math.abs(deltaY.value)) {
      direction.value = deltaX.value > 0 ? 'right' : 'left'
    } else {
      direction.value = deltaY.value > 0 ? 'down' : 'up'
    }
  }

  const onMouseUp = () => {
    if (!isDragging.value) return

    if (progress.value >= 1) {
      switch (direction.value) {
        case 'left':
          options.onDragLeft?.()
          break
        case 'right':
          options.onDragRight?.()
          break
        case 'up':
          options.onDragUp?.()
          break
        case 'down':
          options.onDragDown?.()
          break
      }
    }

    isDragging.value = false
    deltaX.value = 0
    deltaY.value = 0
    direction.value = null

    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  onMounted(() => {
    if (target.value) {
      target.value.addEventListener('mousedown', onMouseDown)
    }
  })

  onUnmounted(() => {
    if (target.value) {
      target.value.removeEventListener('mousedown', onMouseDown)
    }
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  })

  return {
    deltaX,
    deltaY,
    direction,
    progress,
    isDragging,
  }
}
