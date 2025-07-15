<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" v-if="visible">
    <div class="bg-white rounded-xl shadow-xl p-6 max-w-sm text-center">
      <h2 class="text-xl font-semibold mb-4">{{ $t('idleModal.stillThere') }}</h2>
      <p class="text-gray-700 mb-4">
        {{ $t('idleModal.countdownMessage', { countdown }) }}
      </p>
      <dash-button @click="$emit('stayActive')" size="md" variant="primary">
        {{ $t('idleModal.imAlive') }}
      </dash-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashButton from '@/components/buttons/DashButton.vue'
defineProps<{ visible: boolean; countdown: number }>()
defineEmits(['stayActive'])
</script>
