<template>
  <section
    ref="target"
    class="relative overflow-hidden"
    name="swipe-container"
  >
    <!-- Overlay animado -->
    <div
    class="absolute inset-0 pointer-events-none z-10 flex items-center justify-center transition-all duration-200"
    :style="{
        background: overlayColor,
        opacity: progress > 0.05 ? Math.min(progress * 1.2, 0.8) : 0,
    }"
    >
      <vue-feather :type="chevronIcon" class="text-white text-4xl" />
    </div>

    <slot :progress="progress" :deltaX="deltaX" :deltaY="deltaY" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSwipe } from '@/composables/useSwipe'
import type { SwipeOptions } from '@/composables/useSwipe'
import type { transform } from 'typescript';

const props = defineProps<
  SwipeOptions & {
    overlayColor?: string
  }
>()

const target = ref<HTMLElement | null>(null)

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

const originX = computed(() => {
  switch (direction.value) {
    case 'left':
      return '100%'
    case 'right':
      return '0%'
    case 'up':
    case 'down':
      return '50%'
    default:
      return '50%'
  }
})

const originY = computed(() => {
  switch (direction.value) {
    case 'up':
      return '100%'
    case 'down':
      return '0%'
    case 'left':
    case 'right':
      return '50%'
    default:
      return '50%'
  }
})

const overlayColor = computed(() => props.overlayColor || 'rgba(0,0,0,0.3)')
</script>
