<template>
  <section>
    <header class="flex flex-row items-center justify-center mb-2">
      <div class="md:w-5xl flex justify-start">
        <DashTypography variant="h2">Nuevo cliente</DashTypography>
      </div>
    </header>
    <main class="flex flex-col items-center justify-center">
      <div class="md:w-5xl bg-white dark:bg-soft-dark-950 rounded-lg p-6">
        <DashInput
          :is-valid="true"
          :label="$t('name')"
          :id="'customer-name'"
          :name="'customer-name'"
          v-model="customer.name"
        />
        <div name="metrics-list" class="gap-4 mt-4 grid md:grid-cols-2">
          <DashSelect
            :is-valid="true"
            :label="$t('metrics')"
            :id="'customer-name'"
            :name="'customer-name'"
            v-model="currentMetric"
            :options="metrics"
          >
          </DashSelect>
          <div class="flex items-end">
            <DashButton
              size="md"
              variant="primary"
              class="md:w-auto flex items-center justify-center gap-2"
              @click="addMetric"
              >Añadir metrica</DashButton
            >
          </div>
          <div class="col-span-2">
            <DashTypography variant="subtitle1" class="mb-2"> Métricas del cliente </DashTypography>
            <div
              v-for="(metric, index) in customer.metrics"
              role="group"
              class="flex flex-col gap-2"
              :key="index"
            >
              <div class="flex items-center justify-between">
                <DashTypography variant="subtitle2">
                  {{ metric.name }}
                </DashTypography>
                <DashTypography variant="subtitle1"> {{ metric.value }} / 100 </DashTypography>
              </div>
              <DashProgressBar :value="metric.value" :label="$t('archive')" class="mb-4" />
            </div>
          </div>
        </div>
        <div class="col-span-2 mt-6">
          <DashTypography variant="subtitle1" class="mb-2"> Correos a notificar </DashTypography>
          <div class="flex gap-2 mb-3">
            <DashInput
              id="new-email"
              :is-valid="true"
              size="md"
              variant="primary"
              placeholder="correo@ejemplo.com"
              v-model="newEmail"
              class="flex-1"
            />
            <DashButton size="md" variant="secondary" @click="addEmail">Agregar</DashButton>
          </div>
          <ul class="space-y-1">
            <li
              v-for="(email, index) in customer.emails"
              :key="index"
              class="flex justify-between items-center bg-soft-dark-100 dark:bg-soft-dark-800 px-3 py-2 rounded"
            >
              <span class="text-sm">{{ email }}</span>
              <DashButton size="sm" variant="danger" @click="removeEmail(index)">
                Eliminar
              </DashButton>
            </li>
          </ul>
        </div>

        <footer class="w-full flex items-center justify-end gap-2 mt-4">
          <DashButton
            size="md"
            variant="primary"
            class="w-full md:w-auto flex items-center justify-center gap-2"
          >
            {{ $t('save') }}
            <vue-feather type="save" class="w-4 h-4" />
          </DashButton>
        </footer>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DashTypography from '@/components/typography/DashTypography.vue'
import DashProgressBar from '@/components/progressBar/DashProgressBar.vue'
import DashSeparator from '@/components/containers/DashSeparator.vue'
import DashInput from '@/components/inputs/DashInput.vue'
import DashSelect from '@/components/selects/DashSelect.vue'
import DashButton from '@/components/buttons/DashButton.vue'
import type { Customer } from '@/types/customers/customers'

// Variables
const customer = ref<Customer>({
  name: 'Cliente Ejemplo',
  metrics: [
    { name: 'LIMITE DE EXPEDIENTES', value: 33 },
    { name: 'LIMITE DE CONSULTAS PLD', value: 42 },
    { name: 'LIMITE DE CALCULOS DE NIVEL DE RIESGO', value: 25 },
  ],
  emails: [],
})

const currentMetric = ref('')
const newEmail = ref('')

const metrics = ref([
  { label: 'Metric 1', value: 'metric1' },
  { label: 'Metric 2', value: 'metric2' },
  { label: 'Metric 3', value: 'metric3' },
])

// Logic
function addMetric() {
  if (!currentMetric.value) return

  const selected = metrics.value.find((m) => m.value === currentMetric.value)
  if (!selected) return

  const alreadyExists = customer.value.metrics.some((m) => m.name === selected.label)
  if (alreadyExists) return

  customer.value.metrics.unshift({
    name: selected.label,
    value: 0,
  })

  currentMetric.value = ''
}

function addEmail() {
  if (!newEmail.value.trim()) return
  if (!validateEmail(newEmail.value)) return
  if (customer.value.emails.includes(newEmail.value)) return

  customer.value.emails.push(newEmail.value)
  newEmail.value = ''
}

function removeEmail(index: number) {
  customer.value.emails.splice(index, 1)
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
</script>
