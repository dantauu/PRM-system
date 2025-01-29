import { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'

interface AreaItem {
  name: string
  values: Array<{ label: string; value: number }>
}

interface Area {
  options: ApexOptions
  series: ApexAxisChartSeries | ApexNonAxisChartSeries
}

export const useApexArea = (items: AreaItem[]) => {
  // Memo
  const config = useMemo<Area>(
    () => ({
      series: items.map(({ name, values }) => ({
        name,
        data: values.map(({ label, value }) => ({
          x: label,
          y: value,
        })),
      })),
      options: {
        chart: {
          type: 'area',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        legend: {
          show: false,
        },
        stroke: {
          curve: 'smooth',
        },
        tooltip: {
          x: {
            show: false,
          },
        },
        xaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
      },
    }),
    [items]
  )

  return config
}
