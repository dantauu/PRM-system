import './style.scss'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { PageLayout } from '@/shared/components'
import { MemoInput } from '@/shared/components/form/components'
import { $$activeStrategy } from '@/shared/effector'
import { $$TeamStats } from '@/shared/effector/team/team-stats'
import { useApexAreaOptions } from '@/shared/hooks/charts/use-apex-area-options'
import classNames from 'classnames'
import { FC, memo, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useUnit } from 'effector-react'

interface ActiveTeamStatsProps {
  className?: string
}

export const ActiveTeamStats: FC<ActiveTeamStatsProps> = ({ className }) => {
  const [strategyId] = useUnit([$$activeStrategy.$activeStrategyId])
  const [strategyIdChanged, value, endDate, endDateChanged, startDate, startDateChanged] = useUnit([
    $$TeamStats.strategyIdChanged,
    $$TeamStats.$value,
    $$TeamStats.$endDate,
    $$TeamStats.endDateChanged,
    $$TeamStats.$startDate,
    $$TeamStats.startDateChanged,
  ])

  const options = useApexAreaOptions('datetime')

  useEffect(() => {
    strategyIdChanged(strategyId)
  }, [strategyId, strategyIdChanged])

  // Variables
  const ClassName = classNames('active-team-stats', className)

  return (
    <PageLayout.Cloud
      contentClassName={ClassName}
      header={{
        title: 'Статистика активных партнеров',
        subtitle: 'Показана статистика за последний месяц',
        right: (
          <div className="active-team-stats__right-wrapper">
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
            data: value?.map(({ date, count }) => ({
              x: date,
              y: count,
            })),
          },
        ]}
        options={options.options}
        height={260}
      />
    </PageLayout.Cloud>
  )
}

export const MemoActiveTeamStats = memo(ActiveTeamStats)
