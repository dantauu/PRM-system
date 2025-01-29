import { CreateCustomStrategyStatus, CustomStrategyStatus } from '..'
import { request } from '@/shared/api/request'

type CreateCustomStrategyStatusData = Omit<CreateCustomStrategyStatus, 'custom_strategy_id'>

export const create = async ({ custom_strategy_id, ...data }: CreateCustomStrategyStatus) =>
  request<CreateCustomStrategyStatusData, CustomStrategyStatus>(
    `custom_strategies/${custom_strategy_id}/statuses`,
    {
      method: 'POST',
      data,
    }
  )
