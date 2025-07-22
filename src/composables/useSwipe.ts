import { onMounted, onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

interface SwipeActions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

export interface SwipeOptions extends SwipeActions {
  threshold?: number
}

export function useSwipe(
  target: Ref<HTMLElement | null>,
  { onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold = 30 }: SwipeOptions,
) {
  const progress = ref(0)
  const deltaX = ref(0)
  const deltaY = ref(0)

  let startX = 0
  let startY = 0

  const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val))

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    deltaX.value = 0
    deltaY.value = 0
    progress.value = 0
  }

  const onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    deltaX.value = touch.clientX - startX
    deltaY.value = touch.clientY - startY

    const dist = Math.max(Math.abs(deltaX.value), Math.abs(deltaY.value))
    progress.value = clamp(dist / threshold, 0, 1)
  }

  const onTouchEnd = () => {
    const absDx = Math.abs(deltaX.value)
    const absDy = Math.abs(deltaY.value)

    if (Math.max(absDx, absDy) < threshold) return

    if (absDx > absDy) {
      deltaX.value > 0 ? onSwipeRight?.() : onSwipeLeft?.()
    } else {
      deltaY.value > 0 ? onSwipeDown?.() : onSwipeUp?.()
    }

    deltaX.value = 0
    deltaY.value = 0
    progress.value = 0
  }

  onMounted(() => {
    target.value?.addEventListener('touchstart', onTouchStart)
    target.value?.addEventListener('touchmove', onTouchMove)
    target.value?.addEventListener('touchend', onTouchEnd)
  })

  onUnmounted(() => {
    target.value?.removeEventListener('touchstart', onTouchStart)
    target.value?.removeEventListener('touchmove', onTouchMove)
    target.value?.removeEventListener('touchend', onTouchEnd)
  })

  return {
    progress,
    deltaX,
    deltaY,
  }
}
