<template>
  <section class="p-4 bg-white rounded-lg dark:bg-soft-dark-950">
    <Bar :key="JSON.stringify(finalChartData)" :data="finalChartData" :options="finalChartOptions" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartDataset,
  type ChartOptions,
  type ChartData,
} from 'chart.js'

import { setColors } from '@/@core/charts/useChart'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface BarChartProps {
  labels: string[]
  datasets: ChartDataset<'bar'>[]
  options: ChartOptions<'bar'>
}

const props = defineProps<BarChartProps>()

const finalChartOptions = computed<ChartOptions<'bar'>>(() => {
  const clonedOptions = (props.options)
  const clonedDatasets = (props.datasets)

  const { options: updatedOptions } = setColors({
    datasets: clonedDatasets,
    options: clonedOptions,
  })

  return updatedOptions
})

const finalChartData = computed<ChartData<'bar'>>(() => {
  const clonedOptions = props.options
  const clonedDatasets = props.datasets

  const { datasets: updatedDatasets } = setColors({
    datasets: clonedDatasets,
    options: clonedOptions,
  })

  return {
    labels: props.labels,
    datasets: updatedDatasets,
  }
})
</script>
