import { CustomStrategyStatus, UpdateCustomStrategyStatus } from '..'
import { request } from '@/shared/api/request'

type UpdateCustomStrategyStatusData = Omit<UpdateCustomStrategyStatus, 'custom_strategy_status_id'>

export const update = async ({ custom_strategy_status_id, ...data }: UpdateCustomStrategyStatus) =>
  request<UpdateCustomStrategyStatusData, CustomStrategyStatus>(
    `custom_strategies/statuses/${custom_strategy_status_id}`,
    {
      method: 'PUT',
      data,
    }
  )
