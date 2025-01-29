import { PageLayout } from '@/shared/components'
import { $$activeStrategy } from '@/shared/effector'
import { useApexArea } from '@/shared/hooks'
import { useUnit } from 'effector-react'
import ReactApexChart from 'react-apexcharts'

const mockStats = [
  {
    name: 'Иван Иванов',
    values: [
      { label: 'SEP', value: 80 },
      { label: 'OCT', value: 40 },
      { label: 'NOV', value: 28 },
      { label: 'DEC', value: 52 },
      { label: 'JAN', value: 38 },
      { label: 'FEB', value: 100 },
    ],
  },
  {
    name: 'Александр Александров',
    values: [
      { label: 'SEP', value: 11 },
      { label: 'OCT', value: 32 },
      { label: 'NOV', value: 45 },
      { label: 'DEC', value: 32 },
      { label: 'JAN', value: 34 },
      { label: 'FEB', value: 52 },
    ],
  },
]

export const CommunicationsStats = () => {

  const [strategyId] = useUnit([
    $$activeStrategy.$activeStrategyId,
  ])

  // console.log("strategyId", strategyId)

  // Hooks
  const area = useApexArea(mockStats)

  return (
    <PageLayout.Cloud
      contentClassName="contacts-stats"
      header={{
        title: 'Статистика коммуникаций',
        subtitle: 'Показана статистика за последний месяц',
      }}
    >
      <ReactApexChart
        type="area"
        series={area.series}
        options={area.options}
        height={260}
      />
    </PageLayout.Cloud>
  )
}
