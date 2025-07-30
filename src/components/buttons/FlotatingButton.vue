<template>
  <div :class="['fixed z-50', positionClasses]" @click="handleClick">
    <slot>
      <DashTooltip variant="dark" side="left" :offset="10" content="Tooltip">
        <template #trigger>
          <button
            :disabled="disabled"
            class="w-14 h-14 rounded-full cursor-pointer bg-royal-purple-800 hover:bg-royal-purple-600 hover:transform hover:scale-105 ease-out active:scale-95 focus:ring-4 focus:ring-royal-purple-500 transition-all duration-200 text-white text-3xl shadow-lg flex items-center justify-center"
          >
            <vue-feather type="plus" size="22" />
          </button>
        </template>
        <template #content>{{ message }}</template>
      </DashTooltip>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import DashTooltip from '../tooltip/DashTooltip.vue'

type Position =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-center'

interface FlotatingButtonProps {
  position?: Position
  disabled?: boolean
  message?: string
}

const props = withDefaults(defineProps<FlotatingButtonProps>(), {
  position: 'bottom-right',
  disabled: false,
  message: 'Click me!',
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const positionClasses = computed(() => {
  switch (props.position) {
    case 'bottom-left':
      return 'bottom-4 left-4'
    case 'bottom-right':
      return 'bottom-4 right-4'
    case 'top-left':
      return 'top-4 left-4'
    case 'top-right':
      return 'top-4 right-4'
    case 'top-center':
      return 'top-4 left-1/2 -translate-x-1/2'
    case 'bottom-center':
      return 'bottom-4 left-1/2 -translate-x-1/2'
    default:
      return 'bottom-4 right-4'
  }
})

function handleClick() {
  emit('click')
}
</script>
