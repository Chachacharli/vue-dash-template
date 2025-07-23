<template>
  <section class="p-4 bg-white rounded-lg dark:bg-soft-dark-950">
    <Bar :key="JSON.stringify(chartData)" :data="chartData" :options="chartOptions" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import type { ChartOptions, ChartDataset, ChartData } from 'chart.js'
import { useTheme } from '@/composables/useTheme'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { isDark } = useTheme()

interface BarChartProps {
  labels: string[]
  datasets: ChartDataset<'bar'>[]
  options: ChartOptions<'bar'>
}

const props = defineProps<BarChartProps>()

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.labels,
  datasets: props.datasets,
}))

const chartOptions = computed<ChartOptions<'bar'>>(() => props.options)

</script>
