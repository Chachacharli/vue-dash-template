<template>
  <section>
    <h1>Base Home</h1>

  </section>
</template>

<script lang="ts" setup>
import DashButton from '@/components/buttons/DashButton.vue';
import { useDebounce } from '@/composables/useDebounce';

const { debounce } = useDebounce({timeDebounce: 1000});

</script>
