import type { ChartOptions, ChartData, ChartTypeRegistry } from 'chart.js'

export type ChartType = keyof ChartTypeRegistry

export interface BaseChartProps<T extends ChartType = 'bar'> {
  type: T
  data: ChartData<T>
  options?: ChartOptions<T>
  id?: string
  width?: number
  height?: number
}
