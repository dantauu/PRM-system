// Блок История Коммуникаций

import './style.scss'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { PageLayout } from '@/shared/components'
import { MemoInput } from '@/shared/components/form/components'
import { $$activeStrategy } from '@/shared/effector'
import { $$ContactStats } from '@/shared/effector/contact/contact-stats'
import { useApexAreaOptions } from '@/shared/hooks/charts/use-apex-area-options'
import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import ReactApexChart from 'react-apexcharts'

export const ContactsStats = () => {
  const [strategyId] = useUnit([$$activeStrategy.$activeStrategyId])
  const [strategyIdChanged, value, endDate, endDateChanged, startDate, startDateChanged] = useUnit([
    $$ContactStats.strategyIdChanged,
    $$ContactStats.$value,
    $$ContactStats.$endDate,
    $$ContactStats.endDateChanged,
    $$ContactStats.$startDate,
    $$ContactStats.startDateChanged,
  ])

  const options = useApexAreaOptions('datetime')

  useEffect(() => {
    strategyIdChanged(strategyId)
  }, [strategyId, strategyIdChanged])

  return (
    <PageLayout.Cloud
      contentClassName="contacts-stats"
      header={{
        title: 'Статистика Коммуникаций',
        subtitle: 'Показана статистика за последний месяц',
        right: (
          <div className="contacts-stats__right-wrapper">
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
                className='end-date-input'
                value={endDate}
                onChange={endDateChanged}
              />
            </div>
            <MemoActiveStrategySelect className="sales-funnel__select" />
          </div>
        ),
      }}
    >

      <div className='stats-date'>
        <ReactApexChart
          type="area"
          series={[
            {
              data: value?.map(({ date, count }) => ({
                x: date,
                y: count,
              })),
            },
          ]}
          options={options.options}
          height={260}
        />
      </div>
    </PageLayout.Cloud>
  )
}
