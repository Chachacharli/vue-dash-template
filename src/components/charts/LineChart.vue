<template>
  <section class="p-4 bg-white rounded-lg dark:bg-soft-dark-950">
    <Line :key="JSON.stringify(chartData)" :data="chartData" :options="chartOptions" />
  </section>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import type { ChartOptions, ChartDataset, ChartData } from 'chart.js'
import { useTheme } from '@/composables/useTheme'
import { setColors } from '@/@core/charts/useChart'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

interface LineChartProps {
  labels: string[]
  datasets: ChartDataset<'line'>[]
  options: ChartOptions<'line'>
}

const props = defineProps<LineChartProps>()
const { isDark } = useTheme()

const chartData = computed<ChartData<'line'>>(() => ({
  labels: props.labels,
  datasets: props.datasets,
}))

const chartOptions = computed(() =>
  setColors<'line'>({
    datasets: chartData.value.datasets,
    options: props.options,
    theme: isDark.value ? 'dark' : 'light',
  }).options
)

watch(isDark, () => {
  chartData.value.datasets = [...chartData.value.datasets]
})
</script>
