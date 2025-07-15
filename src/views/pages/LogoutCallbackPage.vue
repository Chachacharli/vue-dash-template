<template>
  <main class="min-h-screen flex flex-col items-center justify-center px-4">
    <section class="flex flex-col items-center justify-center p-8 space-y-6">
      <h1 class="font-bold text-2xl text-gray-800 text-center tracking-wide">
        {{ $t('loginPage.processLogOut') }}
      </h1>
      <DashDotLoader />
    </section>
  </main>
</template>

<script setup lang="ts">
import DashDotLoader from '@/components/loaders/DashDotLoader.vue'
</script>
