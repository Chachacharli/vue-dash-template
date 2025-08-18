<template>
  <section class="grid grid-cols-4 gap-4">
    <DashInput id="dashinput" :is-valid="true" v-model="inputs.dashinput" />
    <DashSelect
      id="dashselect"
      :is-valid="true"
      v-model="inputs.dashselect"
      :options="dashSelectOptions"
    />
    <DashCheckbox id="dashcheckbox" :is-valid="true" v-model="inputs.dashcheckbox" />
    <DashSwitch
      id="dashswitch"
      :is-valid="true"
      v-model="inputs.dashcheckbox"
      label="Switch de ejemplo"
      />
    <DashTagsInput
      id="dashtagsinput"
      :is-valid="true"
      v-model="inputs.dashtagsinput"
      :placeholder="'Añade etiquetas'"
    />
    <DashDatePicker
      id="dashdatepicker"
      :is-valid="true"
      v-model="inputs.dashdatepicker"
    />
    <DashDateRangePicker
      id="dashdaterangepicker"
      :is-valid="true"
      v-model="inputs.dashdaterangepicker"
      />
      <DashStepper :steps="steps" v-model="currentStep" />
      {{ currentStep }}
  </section>
</template>

<script setup lang="ts">
import DashSelect from '@/components/selects/DashSelect.vue'
import DashInput from '@/components/inputs/DashInput.vue'
import DashCheckbox from '@/components/checkboxes/DashCheckbox.vue'
import DashTagsInput from '@/components/inputs/DashTagsInput.vue'
import DashDatePicker from '@/components/selects/DashDatePicker.vue'
import DashDateRangePicker from '@/components/selects/DashDateRangePicker.vue'
import DashSwitch from '@/components/checkboxes/DashSwitch.vue'
import DashStepper from '@/components/stepper/DashStepper.vue'

import { ref } from 'vue'
import type { StepItem } from '@/types'
  
const dashSelectOptions = [
  { label: 'Select de ejemplo', value: 'Select de ejemplo' },
  { label: 'Opción 2', value: 'Opción2' },
  { label: 'Opción 3', value: 'Opción3' },
]

const currentStep = ref(1)

const steps: StepItem[] = [
  { step: 1, title: 'Address',   description: 'Add your address here', icon: 'home' },
  { step: 2, title: 'Shipping',  description: 'Set your shipping',     icon: 'archive' },
  { step: 3, title: 'Checkout',  description: 'Confirm your order',    icon: 'check' },
]

const inputs = ref({
  dashinput: 'Input de ejemplo',
  dashselect: 'Opción2',
  dashcheckbox: true,
  dashtagsinput: ['Etiqueta1', 'Etiqueta2'],
  dashdatepicker: new Date().toISOString(),
  dashdaterangepicker: {
    start: new Date().toISOString(),
    end: new Date().toISOString(),
  },
})
</script>
