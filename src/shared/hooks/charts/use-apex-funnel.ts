import { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'

export interface FunnelItem {
  name: string
  value: number
  color: string
}

interface Funnel {
  options: ApexOptions
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
}

export const useApexFunnel = (items: FunnelItem[]): Funnel => {
  // Memo
  const config = useMemo<Funnel>(
    () => ({
      series: [
        {
          name: '',
          data: items.map(({ name, value, color }) => ({
            x: name,
            y: value,
            fillColor: color,
          })),
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            horizontal: true,
            barHeight: '80%',
            isFunnel: true,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opt) {
            return items[opt.dataPointIndex]?.name + ':  ' + items[opt.dataPointIndex]?.value
          },
          dropShadow: {
            enabled: true,
          },
        },
        legend: {
          show: false,
        },
      },
    }),
    [items]
  )

  return config
}
