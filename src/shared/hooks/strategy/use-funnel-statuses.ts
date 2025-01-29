import { FunnelItem } from '../charts'
import { $$activeStrategy, $$globalStrategyStatusColor } from '@/shared/effector'
import { $$contactCustomStrategyStatuses } from '@/shared/effector/contact'
import { useUnit } from 'effector-react'
import { useMemo } from 'react'

interface UseFunnelStatusesParams {
  defaultColor?: string
}
export const useFunnelStatuses = ({ defaultColor = '#000000' }: UseFunnelStatusesParams) => {
  // Effector
  const statuses = useUnit($$activeStrategy.$statuses)
  const colors = useUnit($$globalStrategyStatusColor.getAll.$items)
  const countContactsInStatuses = useUnit($$contactCustomStrategyStatuses.$countContactsInStatuses)
  const requestStatuses = useUnit([
    $$activeStrategy.$statusesStatus,
    $$globalStrategyStatusColor.getAll.$status,
    $$contactCustomStrategyStatuses.$status,
  ])

  // Memo
  const items = useMemo<FunnelItem[]>(
    () =>
      statuses.map((status) => ({
        name: status.name,
        value: countContactsInStatuses[status.custom_strategy_status_id] || 0,
        color:
          colors.find(
            (color) =>
              color.global_strategy_status_color_id === status.global_strategy_status_color_id
          )?.color_HEX || defaultColor,
      })),
    [colors, countContactsInStatuses, defaultColor, statuses]
  )

  // Variables
  const pending = requestStatuses.some((status) => status === 'pending')

  return { items, pending }
}
