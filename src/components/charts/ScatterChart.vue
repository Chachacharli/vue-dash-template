<template>
  <section class="p-4 bg-white rounded-lg dark:bg-soft-dark-950">
    <Scatter :key="JSON.stringify(chartData)" :data="chartData" :options="chartOptions" />
  </section>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { Scatter } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
} from 'chart.js'
import type { ChartOptions, ChartDataset, ChartData } from 'chart.js'
import { useTheme } from '@/composables/useTheme'
import { setColors } from '@/@core/charts/useChart'

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale)

interface ScatterChartProps {
  labels: string[]
  datasets: ChartDataset<'scatter'>[]
  options: ChartOptions<'scatter'>
}

const props = defineProps<ScatterChartProps>()
const { isDark } = useTheme()

const chartData = computed<ChartData<'scatter'>>(() => ({
  labels: props.labels,
  datasets: props.datasets,
}))

const chartOptions = computed(() =>
  setColors({
    datasets: chartData.value.datasets,
    options: props.options,
    theme: isDark.value ? 'dark' : 'light',
  }).options
)

watch(isDark, () => {
  // Forzar recálculo al cambiar el tema
  chartData.value.datasets = [...chartData.value.datasets]
})
</script>
