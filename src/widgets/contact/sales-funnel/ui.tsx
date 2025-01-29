import './style.scss'
import { MemoActiveStrategySelect } from '@/features/strategy'
import { PageLayout } from '@/shared/components'
import FunnelChart from '@/shared/components/sales-funnel/ui'
import { $$basicStrategy } from '@/shared/effector'
import { useApexFunnel } from '@/shared/hooks'
import { useFunnelStatuses } from '@/shared/hooks/strategy/use-funnel-statuses'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

export const SalesFunnel = () => {
  // Hooks
  const { items } = useFunnelStatuses({})

  // Функция для проверки, содержит ли значение поля name числа
  const containsNumbers = (value: string) => {
    return /\d/.test(value)
  }

  // Фильтрация items, чтобы исключить элементы с числами в поле name
  const filteredItems = items.filter((item) => !containsNumbers(item.name))
  const funnel = useApexFunnel(filteredItems)

  // const status = useStoreMap({
  //   store: $$contactCustomStrategyStatuses.$mapStatusToContactId,
  //   keys: [contactId],
  //   fn: (items) => (contactId in items ? items[contactId] : null),
  // })

  // State
  const [, forceUpdate] = useState([])

  // Effects
  useEffect(() => {
    setTimeout(() => forceUpdate([]), 100)
  }, [items])

  return (
    <PageLayout.Cloud
      contentClassName="sales-funnel"
      header={{
        title: 'Воронка продаж',
        subtitle: 'Покажи на что ты способен!',
        right: <MemoActiveStrategySelect className="sales-funnel__select" />,
      }}
    >
      <div className="sales-funnel">
        <div className="sales-funnel__chart">
          <FunnelChart />
        </div>
        <div className="sales-funnel__left">
          <ReactApexChart
            key={filteredItems.length}
            type="bar"
            options={funnel.options}
            series={funnel.series}
            height={400}
          />
        </div>
      </div>
    </PageLayout.Cloud>
  )
}
