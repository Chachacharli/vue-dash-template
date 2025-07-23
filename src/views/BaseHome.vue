<template>
  <section>
    <h1>Base Homes</h1>
    <bar-chart :labels="labels" :datasets="data" :options="options" />
    <dash-button :size="'md'" :variant="'primary'" @click="changeData">Click Me</dash-button>
  </section>
</template>

<script lang="ts" setup>
import BarChart from '@/components/charts/BarChart.vue'
import DashButton from '@/components/buttons/DashButton.vue'
import { ref } from 'vue'
import { useStylesCharts } from '@/@core/charts/useChart'
import type { ChartDataset, ChartOptions } from 'chart.js'

const { HASH_COLORS } = useStylesCharts()

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const data = ref<ChartDataset<'bar'>[]>([
  {
    label: 'Sample Data',
    data: [12, 19, 3, 5, 2, 3, 5],
    backgroundColor: '',
    borderColor: '',
    borderWidth: 1,
  },
])

const changeData = () => {
  data.value[0].data = [10, 15, 5, 7, 3, 4, 6]
}
const barRef = ref()
</script>
