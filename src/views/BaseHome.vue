<template>
  <section>
    <h1>Base Homes</h1>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="">
        <bar-chart :labels="labels" :datasets="data" :options="options" />
      </div>
      <div class="">
        <line-chart :labels="labels" :datasets="lineData" :options="baseOptions" />
      </div>
      <div>
        <scatter-chart :labels="labels" :datasets="scatterData" :options="baseOptions" />
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
import BarChart from '@/components/charts/BarChart.vue'
import ScatterChart from '@/components/charts/ScatterChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import { ref } from 'vue'
import type { ChartDataset, ChartOptions } from 'chart.js'



const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

// Datos de ejemplo para el gráfico de barras

const options = ref<ChartOptions<'bar'>>({
  responsive: true,
  scales: {
    x: {
      type: 'category' as const,
      title: {
        display: true,
        text: 'Months',
        color: '',
      },
      grid: {
        color: '',
      },
      ticks: {
        color: '',
      },
    },
    y: {
      type: 'linear' as const,
      beginAtZero: true,
      title: {
        display: true,
        text: 'Value',
        color: '',
      },
      grid: {
        color: '',
      },
      ticks: {
        color: '',
      },
    },
  },
})
const data = ref<ChartDataset<'bar'>[]>([
  {
    label: 'Sample Data',
    data: [12, 19, 3, 5, 2, 3, 5],
    backgroundColor: '',
    borderColor: '',
    borderWidth: 1,
  },
])

// Datos de ejemplo para el gráfico de líneas
const lineData = ref<ChartDataset<'line'>[]>([
  {
    label: 'Ventas',
    data: [30, 50, 40, 60, 70],
    tension: 0.4,
    fill: false,
  },
])

// Datos de ejemplo para el gráfico de dispersión
const scatterData = ref<ChartDataset<'scatter'>[]>([
  {
    label: 'Dispersión',
    data: [
      { x: 1, y: 3 },
      { x: 2, y: 5 },
      { x: 3, y: 2 },
      { x: 4, y: 8 },
    ],
  },
])

const baseOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Gráfico Interactivo' },
  },
}

</script>

