<script setup lang="ts">
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from 'reka-ui'
import { computed, useTemplateRef } from 'vue'

import type { StepItem } from '@/types'

const props = withDefaults(
  defineProps<{
    steps: StepItem[]
    /** Controlado (v-model). Si lo pasas, el componente obedece este valor */
    modelValue?: number
    /** No controlado. Si NO pasas v-model, se usa este valor inicial */
    defaultValue?: number
    orientation?: 'horizontal' | 'vertical'
    linear?: boolean
  }>(),
  {
    defaultValue: 1,
    orientation: 'horizontal',
    linear: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

/** v-model controlado */
const controlledValue = computed({
  get: () => props.modelValue as number,
  set: (v: number) => emit('update:modelValue', v),
})

/** Determina si el componente está en modo controlado */
const isControlled = computed(() => props.modelValue !== undefined)

/** Ref al StepperRoot de Reka para usar métodos (prev/next/goTo) */
const rootRef = useTemplateRef('rootRef')

/** Exponemos helpers al padre */
function next() {
  if (isControlled.value) {
    const current = props.modelValue ?? props.defaultValue ?? 1
    if (current < props.steps.length) emit('update:modelValue', current + 1)
  } else if (rootRef.value && typeof rootRef.value.$emit === 'function') {
    rootRef.value.$emit(
      'update:modelValue',
      (rootRef.value.modelValue ?? props.defaultValue ?? 1) + 1,
    )
  }
}
function prev() {
  if (isControlled.value) {
    const current = props.modelValue ?? props.defaultValue ?? 1
    if (current > 1) emit('update:modelValue', current - 1)
  } else if (rootRef.value && typeof rootRef.value.$emit === 'function') {
    rootRef.value.$emit(
      'update:modelValue',
      (rootRef.value.modelValue ?? props.defaultValue ?? 1) - 1,
    )
  }
}
function goTo(n: number) {
  if (isControlled.value) {
    emit('update:modelValue', n)
  } else if (rootRef.value && typeof rootRef.value.$emit === 'function') {
    rootRef.value.$emit('update:modelValue', n)
  }
}

defineExpose({ next, prev, goTo })
</script>

<template>
  <!-- CONTROLADO -->
  <StepperRoot
    v-if="isControlled"
    ref="rootRef"
    v-model="controlledValue"
    :orientation="orientation"
    :linear="linear"
    class="flex gap-2 w-full"
    v-slot="{ modelValue }"
  >
    <StepperItem
      v-for="item in props.steps"
      :key="item.step"
      :step="item.step"
      :completed="(modelValue ?? 1) > item.step"
      class="relative flex-1 flex justify-center px-4"
    >
      <StepperTrigger
        class="flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-sm outline-none transition-colors duration-200 group-data-[disabled]:opacity-50 group-data-[disabled]:cursor-not-allowed data-[state=active]:bg-royal-purple-600 data-[state=active]:border-royal-purple-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:border-royal-purple-200 data-[state=inactive]:text-royal-purple-800 data-[state=completed]:bg-royal-purple-700 data-[state=completed]:border-royal-purple-700 data-[state=completed]:text-white"
        :aria-label="item.title"
      >
        <StepperIndicator>
          <vue-feather v-if="item.icon" :type="item.icon" class="w-5 h-5" />
          <span v-else class="text-sm font-medium">{{ item.step }}</span>
        </StepperIndicator>
      </StepperTrigger>

      <StepperSeparator
        v-if="item.step !== props.steps[props.steps.length - 1].step"
        class="absolute top-5 left-[calc(50%+30px)] right-[calc(-50%+20px)] h-0.5 rounded-full bg-royal-purple-200/60"
      />

      <div
        class="absolute top-full left-0 w-full mt-2 text-center group-data-[disabled]:opacity-50"
      >
        <StepperTitle class="font-medium text-royal-purple-900">
          {{ item.title }}
        </StepperTitle>
        <StepperDescription
          v-if="item.description"
          class="hidden sm:block text-xs text-royal-purple-800"
        >
          {{ item.description }}
        </StepperDescription>
      </div>
    </StepperItem>
  </StepperRoot>

  <!-- NO CONTROLADO -->
  <StepperRoot
    v-else
    ref="rootRef"
    :default-value="defaultValue"
    :orientation="orientation"
    :linear="linear"
    class="flex gap-2 w-full"
    v-slot="{ modelValue }"
  >
    <StepperItem
      v-for="item in props.steps"
      :key="item.step"
      :step="item.step"
      :completed="(modelValue ?? 1) > item.step"
      class="relative flex-1 flex justify-center px-4 "
    >
      <StepperTrigger
        class="flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-sm outline-none transition-colors duration-200 group-data-[disabled]:opacity-50 group-data-[disabled]:cursor-not-allowed data-[state=active]:bg-royal-purple-600 data-[state=active]:border-royal-purple-600 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:border-royal-purple-200 data-[state=inactive]:text-royal-purple-800 data-[state=completed]:bg-royal-purple-700 data-[state=completed]:border-royal-purple-700 data-[state=completed]:text-white"
        :aria-label="item.title"
      >
        <StepperIndicator >
          <vue-feather v-if="item.icon" :type="item.icon" class="w-5 h-5" />
          <span v-else class="text-sm font-medium">{{ item.step }}</span>
        </StepperIndicator>
      </StepperTrigger>

      <StepperSeparator
        v-if="item.step !== props.steps[props.steps.length - 1].step"
        class="absolute top-5 left-[calc(50%+30px)] right-[calc(-50%+20px)] h-0.5 rounded-full bg-royal-purple-200/60"
      />

      <div
        class="absolute top-full left-0 w-full mt-2 text-center group-data-[disabled]:opacity-50"
      >
        <StepperTitle class="font-medium text-royal-purple-900">
          {{ item.title }}
        </StepperTitle>
        <StepperDescription
          v-if="item.description"
          class="hidden sm:block text-xs text-royal-purple-800"
        >
          {{ item.description }}
        </StepperDescription>
      </div>
    </StepperItem>
  </StepperRoot>
</template>
