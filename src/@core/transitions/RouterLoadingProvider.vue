<script setup lang="ts">
import { useUiStore } from '@/stores/useUiStore'
import DashDotLoader from '@/components/loaders/DashDotLoader.vue'
const ui = useUiStore()
</script>

<template>
  <div>
    <!-- Overlay de carga -->
    <Transition name="fade">
      <div
        v-if="ui.isLoading"
        class="fixed inset-0 bg-white/70 dark:bg-dark-950/70 z-50 flex items-center justify-center pointer-events-auto transition-opacity"
      >
        <DashDotLoader />
        <!-- Si prefieres usar un loader más sencillo puedes utilizar este por debajo -->
        <!-- <div class="loader" /> -->
      </div>
    </Transition>

    <!-- Renderiza contenido hijo -->
    <slot />
  </div>
</template>

<style scoped>
.loader {
  width: 3rem;
  height: 3rem;
  border: 4px solid #ccc;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
