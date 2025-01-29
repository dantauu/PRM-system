import './style.scss'
import { Form } from '@/shared/components'
import { $$activeStrategy, $$customStrategies } from '@/shared/effector'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'

interface ActiveStrategySelectProps {
  className?: string

  size?: 'sm' | 'lg'
}

export const ActiveStrategySelect: FC<ActiveStrategySelectProps> = ({ className, size = 'sm' }) => {
  // Effector
  const [strategies, strategyId, strategyChanged] = useUnit([
    $$customStrategies.$items,
    $$activeStrategy.$activeStrategyId,
    $$activeStrategy.activeStrategyChanged,
  ])

  // Variables
  const ClassName = classNames('active-strategy-select', className)

  const strategiesForSelect = strategies.map((strategy) => ({
    value: strategy.custom_strategy_id,
    text: strategy.name,
  }))

  if (!strategyId) {
    return null
  }

  return (
    <Form.Select
      className={ClassName}
      size={size}
      items={strategiesForSelect}
      value={strategyId}
      onChange={strategyChanged}
    />
  )
}

export const MemoActiveStrategySelect = memo(ActiveStrategySelect)
