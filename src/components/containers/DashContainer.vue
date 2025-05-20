<template>
  <section :name="name" class="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">

type ContainerProps = {
  name?: string;
}

const { name } = defineProps<ContainerProps>();

</script>