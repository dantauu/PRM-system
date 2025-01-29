import './style.scss'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { PageLayout } from '@/shared/components'
import { MemoInput } from '@/shared/components/form/components'
import { $$activeStrategy } from '@/shared/effector'
import { $$FinancesStats } from '@/shared/effector/finance/finances-stats'
import { useApexAreaOptions } from '@/shared/hooks/charts/use-apex-area-options'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

export const FinancesStats = () => {
  const [strategyId] = useUnit([$$activeStrategy.$activeStrategyId])
  const [strategyIdChanged, value, endDate, endDateChanged, startDate, startDateChanged] = useUnit([
    $$FinancesStats.strategyIdChanged,
    $$FinancesStats.$value,
    $$FinancesStats.$endDate,
    $$FinancesStats.endDateChanged,
    $$FinancesStats.$startDate,
    $$FinancesStats.startDateChanged,
  ])

  const options = useApexAreaOptions('datetime')

  useEffect(() => {
    strategyIdChanged(strategyId)
  }, [strategyId, strategyIdChanged])

  return (
    <PageLayout.Cloud
      contentClassName="finance-stats"
      header={{
        title: 'Статистика доходов',
        subtitle: 'Показана статистика за последний месяц',
        right: (
          <div className="finance-stats__right-wrapper">
            <div className="right-wrapper">
              <p>Начало:</p>
              <MemoInput
                type="date"
                name="start-date"
                value={startDate}
                onChange={startDateChanged}
              />
            </div>
            <div className="right-wrapper">
              <p>Конец:</p>
              <MemoInput
                type="date"
                name="end-date"
                value={endDate}
                onChange={endDateChanged}
              />
            </div>
            <MemoActiveStrategySelect className="sales-funnel__select" />
          </div>
        ),
      }}
    >
      <ReactApexChart
        type="area"
        series={[
          {
            data: value?.map(({ date, sum }) => ({
              x: date,
              y: sum,
            })),
          },
        ]}
        options={options.options}
        height={260}
      />
    </PageLayout.Cloud>
  )
}
