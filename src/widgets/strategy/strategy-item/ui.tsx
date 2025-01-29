import './style.scss'
import { StrategyItemLayout } from '@/entities/strategy'
import { EditStrategyButton, LikeStrategyButton } from '@/features/strategy'
import { CustomStrategy } from '@/shared/api'
import classNames from 'classnames'
import { FC, memo } from 'react'

interface StrategyItemProps {
  className?: string

  strategy: CustomStrategy
}

export const StrategyItem: FC<StrategyItemProps> = ({ className, strategy }) => {
  // Variables
  const ClassName = classNames('strategy-item', className)

  return (
    <StrategyItemLayout
      className={ClassName}
      likeButtonSlot={<LikeStrategyButton />}
      title={strategy.name}
      subtitle="Базовая стратегия"
      rightButtonSlot={<EditStrategyButton strategy={strategy} />}
    />
  )
}

export const MemoStrategyItem = memo(StrategyItem)
