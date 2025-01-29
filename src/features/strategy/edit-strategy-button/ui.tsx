import { CustomStrategy } from '@/shared/api'
import { MemoButton } from '@/shared/components'
import { $$activeStrategy } from '@/shared/effector'
import { routes } from '@/shared/router'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo, useCallback } from 'react'

interface EditStrategyButtonProps {
  className?: string
  strategy: CustomStrategy
}

export const EditStrategyButton: FC<EditStrategyButtonProps> = ({ className, strategy }) => {
  // Effector
  const activeStrategyChanged = useUnit($$activeStrategy.activeStrategyChanged)
  // Variables
  const ClassName = classNames('edit-strategy-button', className)

  // Handler
  const handleCLick = useCallback(() => {
    activeStrategyChanged(strategy.custom_strategy_id)
  }, [activeStrategyChanged, strategy.custom_strategy_id])

  return (
    <MemoButton
      className={ClassName}
      to={routes.account.strategy.edit}
      onClick={handleCLick}
    >
      Редактировать
    </MemoButton>
  )
}

export const MemoEditStrategyButton = memo(EditStrategyButton)
