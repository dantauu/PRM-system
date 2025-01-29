// Страница маркетплейс, блок пакеты активности
import './style.scss'
import { MemoActivityItemLayout } from '@/entities/activity/activity-item-layout/index'
import { LikeStrategyButton } from '@/features/strategy'
import { Strategy } from '@/shared/api'
import { Button } from '@/shared/components'
import classNames from 'classnames'
import { ethers } from 'ethers'
import { FC, memo } from 'react'

interface MarketPlaceActivityProps {
  className?: string

  activity: Strategy[] //заменить стратегии на активности
}

export const MarketPlaceActivity: FC<MarketPlaceActivityProps> = ({ className, activity }) => {
  // Variables
  const ClassName = classNames('market-place-activity__items', className)

  return (
    <div className={ClassName}>
      {activity.map((item) => (
        <MemoActivityItemLayout
          key={item.id}
          className="market-place-activity__item"
          title={item.name} //получать из бэка
          rightTitle="Осталось: 200" //получать из бэка
          subtitle="Активность 1 месяц" //получать из бэка
          likeButtonSlot={<LikeStrategyButton />}
          leftButtonSlot={<div className="market-place-activity__item-price">Цена: $1</div>}
          rightButtonSlot={<Button circle>Купить</Button>}
        />
      ))}
    </div>
  )
}

export const MemoMarketPlaceActivity = memo(MarketPlaceActivity)
