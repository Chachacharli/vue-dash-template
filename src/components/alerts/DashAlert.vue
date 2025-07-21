<template>
  <div :class="containerClasses">
    <vue-feather size="20" :type="Icons[props.type]" :class="iconClasses" />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type AlertType = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'

type AlertProps = {
  type: AlertType
}

const props = defineProps<AlertProps>()

const typeMapping: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  primary: {
    bg: 'bg-royal-purple-50 dark:bg-royal-purple-900',
    border: 'border-royal-purple-200 dark:border-royal-purple-900',
    text: 'text-royal-purple-800 dark:text-royal-purple-200',
    icon: 'text-royal-purple-500 dark:text-royal-purple-200',
  },
  secondary: {
    bg: 'bg-gray-50 dark:bg-gray-900',
    border: 'border-gray-200 dark:border-gray-900',
    text: 'text-gray-800 dark:text-gray-800',
    icon: 'text-gray-500 dark:text-gray-800',
  },
  success: {
    bg: 'bg-green-50 dark:bg-green-900',
    border: 'border-green-200 dark:border-green-900',
    text: 'text-green-800 dark:text-green-600',
    icon: 'text-green-500 dark:text-green-600',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900',
    border: 'border-red-200 dark:border-red-900',
    text: 'text-red-800 dark:text-red-600',
    icon: 'text-red-500 dark:text-red-600',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900',
    border: 'border-yellow-200 dark:border-yellow-900',
    text: 'text-yellow-800 dark:text-yellow-600',
    icon: 'text-yellow-500 dark:text-yellow-600',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900',
    border: 'border-blue-200 dark:border-blue-900',
    text: 'text-blue-800 dark:text-blue-600',
    icon: 'text-blue-500 dark:text-blue-600',
  },
}

const Icons = {
  primary: 'info',
  secondary: 'info',
  success: 'check-circle',
  error: 'x-circle',
  warning: 'alert-triangle',
  info: 'alert-circle',
}

const containerClasses = computed(() => {
  const typeClasses = typeMapping[props.type] || typeMapping.primary
  return `flex items-start gap-3 p-4 border rounded-md ${typeClasses.bg} ${typeClasses.border} ${typeClasses.text}`
})

const iconClasses = computed(() => {
  const typeClasses = typeMapping[props.type] || typeMapping.primary
  return typeClasses.icon
})
</script>
