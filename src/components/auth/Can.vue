<script setup lang="ts">
import { computed } from 'vue';
import { usePermissions } from '@/composables/usePermissions'

const props = defineProps<{
  roles?: string[]
  permissions?: string[]
}>()

const { can, hasPermission } = usePermissions()

const isAllowed = computed(() => {
  if (props.roles) return can(props.roles)
  if (props.permissions) return props.permissions.some(p => hasPermission(p))
  return false
})
</script>

<template>
  <slot v-if="isAllowed" />
</template>
