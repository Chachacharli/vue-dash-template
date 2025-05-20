<template>
  <section class="flex flex-col bg-white border border-slate-300 rounded">
    <div :class="[`px-${paddingX} mx-${marginX} py-${paddingY} my-${marginY} `]">
      <div v-if="title" name="panel-title">
        <span>{{ title }}</span>
      </div>
    </div>
    <div class="border-b-slate-300 border-t-transparent border-x-transparent">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
type PanelProps = {
  name?: string
  title?: string
  paddingX?: number
  marginX?: number
  paddingY?: number
  marginY?: number
}

const props = withDefaults(defineProps<PanelProps>(), {
  paddingX: 4,
  paddingY: 3,
  marginX: 0,
  marginY: 0
})
</script>
