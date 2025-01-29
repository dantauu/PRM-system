import { $$activeStrategy, $$globalStrategyStatusColor } from '@/shared/effector'
import { useUnit } from 'effector-react'
import { useMemo } from 'react'

interface UseSpeedometerStatusesParams {
  defaultColor?: string
}
export const useSpeedometerStatuses = ({
  defaultColor = '#000000',
}: UseSpeedometerStatusesParams) => {
  // Effector
  const statuses = useUnit($$activeStrategy.$statuses)
  const colors = useUnit($$globalStrategyStatusColor.getAll.$items)

  const requestStatuses = useUnit([
    $$activeStrategy.$statusesStatus,
    $$globalStrategyStatusColor.getAll.$status,
  ])

  // Memo
  const speedometer = useMemo(() => {
    return statuses.map((status) => ({
      id: status.custom_strategy_status_id,
      color:
        colors.find(
          (color) =>
            color.global_strategy_status_color_id === status.global_strategy_status_color_id
        )?.color_HEX || defaultColor,
    }))
  }, [colors, defaultColor, statuses])

  // Variables
  const pending = requestStatuses.some((status) => status === 'pending')

  return { speedometer, pending }
}
