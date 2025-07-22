<template>
  <section ref="target" class="relative overflow-hidden" name="swipe-container">
    <!-- Overlay animado -->
    <div
      v-if="direction && progress > 0.01"
      class="absolute rounded-full z-10 pointer-events-none transition-all duration-200 flex items-center justify-center"
      :style="{
        width: '100px',
        height: '100px',
        background: overlayColor,
        opacity: Math.min(progress * 1.5, 0.8),
        ...positionStyle,
      }"
    >
      <vue-feather :type="chevronIcon" class="text-white w-8 h-8" />
    </div>

    <slot :progress="progress" :deltaX="deltaX" :deltaY="deltaY" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useSwipe } from '@/composables/useSwipe'
import type { SwipeOptions } from '@/composables/useSwipe'

const props = defineProps<
  SwipeOptions & {
    overlayColor?: string
  }
>()

const target = ref<HTMLElement | null>(null)
const containerRect = ref<DOMRect | null>(null)

const { progress, deltaX, deltaY } = useSwipe(target, {
  onSwipeLeft: props.onSwipeLeft,
  onSwipeRight: props.onSwipeRight,
  onSwipeUp: props.onSwipeUp,
  onSwipeDown: props.onSwipeDown,
  threshold: props.threshold || 100,
})

// Determinar dirección principal del swipe en tiempo real
const direction = computed(() => {
  const absX = Math.abs(deltaX.value)
  const absY = Math.abs(deltaY.value)
  if (Math.max(absX, absY) < 5) return null
  if (absX > absY) return deltaX.value > 0 ? 'right' : 'left'
  return deltaY.value > 0 ? 'down' : 'up'
})

const updateRect = () => {
  if (target.value) {
    containerRect.value = target.value.getBoundingClientRect()
  }
}

// Actualiza al montar y si cambia el tamaño
onMounted(() => {
  updateRect()
  window.addEventListener('resize', updateRect)
})

watch(target, () => {
  updateRect()
})

// Chevron dinámico
const chevronIcon = computed(() => {
  switch (direction.value) {
    case 'left':
      return 'chevron-left'
    case 'right':
      return 'chevron-right'
    case 'up':
      return 'chevron-up'
    case 'down':
      return 'chevron-down'
    default:
      return 'chevron-right'
  }
})

const positionStyle = computed(() => {
  const rect = containerRect.value
  const p = progress.value

  if (!rect || p <= 0) {
    return {
      opacity: 0,
      transform: 'scale(0)',
    }
  }

  const maxOffsetX = rect.width / 2
  const maxOffsetY = rect.height / 2

  switch (direction.value) {
    case 'left':
      return {
        top: `${rect.height / 2}px`,
        left: `${rect.width}px`,
        transform: `translateX(-${p * maxOffsetX}px) translateY(-50%)`,
      }
    case 'right':
      return {
        top: `${rect.height / 2}px`,
        left: `-100px`,
        transform: `translateX(${p * maxOffsetX}px) translateY(-50%)`,
      }
    case 'up':
      return {
        left: `${rect.width / 2}px`,
        top: `${rect.height}px`,
        transform: `translateY(-${p * maxOffsetY}px) translateX(-50%)`,
      }
    case 'down':
      return {
        left: `${rect.width / 2}px`,
        top: `-100px`,
        transform: `translateY(${p * maxOffsetY}px) translateX(-50%)`,
      }
    default:
      return {
        opacity: 0,
        transform: 'scale(0)',
      }
  }
})

const overlayColor = computed(() => props.overlayColor || 'rgba(0,0,0,0.3)')
</script>
