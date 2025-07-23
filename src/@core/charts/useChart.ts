// import { reactive } from 'vue'
import type { ChartData, ChartOptions, ChartDataset } from 'chart.js'
// import { createExternalTooltipHandler } from '@/@core/charts/useTooltipChart'
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'


interface UseChartParams<T = string | number> {
  labels: string[]
  datasets: {
    label: string
    data: T[]
    backgroundColor?: string | string[]
    borderColor?: string
    fill?: boolean
    type?: 'line' | 'bar' | 'scatter'
  }[]
  title?: string
  stacked?: boolean
  tooltipHtml?: (data: any) => string
}


export enum ChartPalletCollors {
  'primary-50'= 'primary-50',
  'primary-100'= 'primary-100',
  'primary-200'= 'primary-200',
  'primary-300'= 'primary-300',
  'primary-400'= 'primary-400',
  'primary-500'= 'primary-500',
  'primary-600'= 'primary-600',
  'primary-700'= 'primary-700',
  'primary-800'= 'primary-800',
  'primary-900'= 'primary-900',
  'green-50'= 'green-50',
  'green-100'= 'green-100',
  'green-200'= 'green-200',
  'green-300'= 'green-300',
  'green-400'= 'green-400',
  'green-500'= 'green-500',
  'green-600'= 'green-600',
  'green-700'= 'green-700',
  'green-800'= 'green-800',
  'red-50'= 'red-50',
  'red-100'= 'red-100',
  'red-200'= 'red-200',
  'red-300'= 'red-300',
  'red-400'= 'red-400',
  'red-500'= 'red-500',
  'red-600'= 'red-600',
  'red-700'= 'red-700',
  'red-800'= 'red-800',
  'blue-50'= 'blue-50',
  'blue-100'= 'blue-100',
  'blue-200'= 'blue-200',
  'blue-300'= 'blue-300',
  'blue-400'= 'blue-400',
  'blue-500'= 'blue-500',
  'blue-600'= 'blue-600',
  'blue-700'= 'blue-700',
  'blue-800'= 'blue-800',
  'blue-900'= 'blue-900',
  'ligh-bg-50'= 'ligh-bg-50',
  'ligh-bg-100'= 'ligh-bg-100',
  'ligh-bg-200'= 'ligh-bg-200',
  'ligh-bg-300'= 'ligh-bg-300',
  'ligh-bg-400'= 'ligh-bg-400',
  'ligh-bg-500'= 'ligh-bg-500',
  'ligh-bg-600'= 'ligh-bg-600',
  'ligh-bg-700'= 'ligh-bg-700',
  'ligh-bg-800'= 'ligh-bg-800',
  'ligh-bg-900'= 'ligh-bg-900',
  'dark-bg-50'= 'dark-bg-50',
  'dark-bg-100'= 'dark-bg-100',
  'dark-bg-200'= 'dark-bg-200',
  'dark-bg-300'= 'dark-bg-300',
  'dark-bg-400'= 'dark-bg-400',
  'dark-bg-500'= 'dark-bg-500',
  'dark-bg-600'= 'dark-bg-600',
  'dark-bg-700'= 'dark-bg-700',
  'dark-bg-800'= 'dark-bg-800',
  'dark-bg-900'= 'dark-bg-900',
  'bg-dark'= 'bg-dark',
  'bg-light'= 'bg-light',
}



export const useStylesCharts = () => {
  const styles = getComputedStyle(document.documentElement)
  const HASH_COLORS = {
    [ChartPalletCollors['primary-100']]: styles.getPropertyValue('--color-royal-purple-100'),
    [ChartPalletCollors['primary-200']]: styles.getPropertyValue('--color-royal-purple-200'),
    [ChartPalletCollors['primary-300']]: styles.getPropertyValue('--color-royal-purple-300'),
    [ChartPalletCollors['primary-400']]: styles.getPropertyValue('--color-royal-purple-400'),
    [ChartPalletCollors['primary-500']]: styles.getPropertyValue('--color-royal-purple-500'),
    [ChartPalletCollors['primary-600']]: styles.getPropertyValue('--color-royal-purple-600'),
    [ChartPalletCollors['primary-700']]: styles.getPropertyValue('--color-royal-purple-700'),
    [ChartPalletCollors['primary-800']]: styles.getPropertyValue('--color-royal-purple-800'),
    [ChartPalletCollors['primary-900']]: styles.getPropertyValue('--color-royal-purple-900'),
    [ChartPalletCollors['green-50']]: styles.getPropertyValue('--color-green-50'),
    [ChartPalletCollors['green-100']]: styles.getPropertyValue('--color-green-100'),
    [ChartPalletCollors['green-200']]: styles.getPropertyValue('--color-green-200'),
    [ChartPalletCollors['green-300']]: styles.getPropertyValue('--color-green-300'),
    [ChartPalletCollors['green-400']]: styles.getPropertyValue('--color-green-400'),
    [ChartPalletCollors['green-500']]: styles.getPropertyValue('--color-green-500'),
    [ChartPalletCollors['green-600']]: styles.getPropertyValue('--color-green-600'),
    [ChartPalletCollors['green-700']]: styles.getPropertyValue('--color-green-700'),
    [ChartPalletCollors['green-800']]: styles.getPropertyValue('--color-green-800'),
    [ChartPalletCollors['red-50']]: styles.getPropertyValue('--color-red-50'),
    [ChartPalletCollors['red-100']]: styles.getPropertyValue('--color-red-100'),
    [ChartPalletCollors['red-200']]: styles.getPropertyValue('--color -red-200'),
    [ChartPalletCollors['red-300']]: styles.getPropertyValue('--color-red-300'),
    [ChartPalletCollors['red-400']]: styles.getPropertyValue('--color-red-400'),
    [ChartPalletCollors['red-500']]: styles.getPropertyValue('--color-red-500'),
    [ChartPalletCollors['red-600']]: styles.getPropertyValue('--color-red-600'),
    [ChartPalletCollors['red-700']]: styles.getPropertyValue('--color-red-700'),
    [ChartPalletCollors['red-800']]: styles.getPropertyValue('--color-red-800'),
    [ChartPalletCollors['blue-50']]: styles.getPropertyValue('--color-blue-50'),
    [ChartPalletCollors['blue-100']]: styles.getPropertyValue('--color-blue-100'),
    [ChartPalletCollors['blue-200']]: styles.getPropertyValue('--color-blue-200'),
    [ChartPalletCollors['blue-300']]: styles.getPropertyValue('--color-blue-300'),
    [ChartPalletCollors['blue-400']]: styles.getPropertyValue('--color-blue-400'),
    [ChartPalletCollors['blue-500']]: styles.getPropertyValue('--color-blue-500'),
    [ChartPalletCollors['blue-600']]: styles.getPropertyValue('--color-blue-600'),
    [ChartPalletCollors['blue-700']]: styles.getPropertyValue('--color-blue-700'),
    [ChartPalletCollors['blue-800']]: styles.getPropertyValue('--color-blue-800'),
    [ChartPalletCollors['blue-900']]: styles.getPropertyValue('--color-blue-900'),
    // [ChartPalletCollors['ligh-bg-50']]: styles.getPropertyValue('--color-light-bg-50'),
    // [ChartPalletCollors['ligh-bg-100']]: styles.getPropertyValue('--color-victoria-100'),
    // [ChartPalletCollors['ligh-bg-200']]: styles.getPropertyValue('--color-victoria-200'),
    // [ChartPalletCollors['ligh-bg-300']]: styles.getPropertyValue('--color-victoria-300'),
    // [ChartPalletCollors['ligh-bg-400']]: styles.getPropertyValue('--color-victoria-400'),
    // [ChartPalletCollors['ligh-bg-500']]: styles.getPropertyValue('--color-victoria-500'),
    // [ChartPalletCollors['ligh-bg-600']]: styles.getPropertyValue('--color-victoria-600'),
    // [ChartPalletCollors['ligh-bg-700']]: styles.getPropertyValue('--color-victoria-700'),
    // [ChartPalletCollors['ligh-bg-800']]: styles.getPropertyValue('--color-victoria-800'),
    // [ChartPalletCollors['ligh-bg-900']]: styles.getPropertyValue('--color-victoria-900'),
    [ChartPalletCollors['dark-bg-50']]: styles.getPropertyValue('--color-soft-dark-50'),
    [ChartPalletCollors['dark-bg-100']]: styles.getPropertyValue('--color-soft-dark-100'),
    [ChartPalletCollors['dark-bg-200']]: styles.getPropertyValue('--color-soft-dark-200'),
    [ChartPalletCollors['dark-bg-300']]: styles.getPropertyValue('--color-soft-dark-300'),
    [ChartPalletCollors['dark-bg-400']]: styles.getPropertyValue('--color-soft-dark-400'),
    [ChartPalletCollors['dark-bg-500']]: styles.getPropertyValue('--color-soft-dark-500'),
    [ChartPalletCollors['dark-bg-600']]: styles.getPropertyValue('--color-soft-dark-600'),
    [ChartPalletCollors['dark-bg-700']]: styles.getPropertyValue('--color-soft-dark-700'),
    [ChartPalletCollors['dark-bg-800']]: styles.getPropertyValue('--color-soft-dark-800'),
    [ChartPalletCollors['dark-bg-900']]: styles.getPropertyValue('--color-soft-dark-900'),
    [ChartPalletCollors['bg-dark']]: styles.getPropertyValue('--color-bg-dark'),
    [ChartPalletCollors['bg-light']]: styles.getPropertyValue('--color-bg-light'),

  }
  return {
    styles,
    HASH_COLORS
  }
}
