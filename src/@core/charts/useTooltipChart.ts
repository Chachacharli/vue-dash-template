/*
options: {
  plugins: {
    tooltip: {
      enabled: false,
      external: createExternalTooltipHandler((tooltip) => {
        return `<div class="bg-white p-2 shadow-md rounded">${tooltip.title}</div>`
      })
    }
  }
}
*/


export const createExternalTooltipHandler = (renderHtml: (data: any) => string) => {
  return (context: any) => {
    const tooltip = context.tooltip
    const el = document.getElementById('chart-tooltip') ?? document.createElement('div')

    el.id = 'chart-tooltip'
    el.innerHTML = renderHtml(tooltip)
    el.style.position = 'absolute'
    el.style.left = tooltip.x + 'px'
    el.style.top = tooltip.y + 'px'
    el.style.pointerEvents = 'none'
    el.style.opacity = '1'
    el.style.transition = 'opacity 0.3s'

    document.body.appendChild(el)
  }
}

