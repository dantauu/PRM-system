import { ApexOptions } from 'apexcharts'
import { useMemo } from 'react'

interface Area {
  options: ApexOptions
}

export const useApexAreaOptions = (type?: 'numeric' | 'datetime' | 'category') => {
  // Memo
  const config = useMemo<Area>(
    () => ({
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
          type: type,
        },
        yaxis: {
          show: false,
        },
      },
    }),
    [type]
  )

  return config
}
