import { CreateCustomStrategyStep, CustomStrategyStep } from '..'
import { request } from '@/shared/api/request'

type CreateCustomStrategyStepData = Omit<CreateCustomStrategyStep, 'custom_strategy_id'>

export const create = async ({ custom_strategy_id, ...data }: CreateCustomStrategyStep) =>
  request<CreateCustomStrategyStepData, CustomStrategyStep>(
    `custom_strategies/${custom_strategy_id}/steps`,
    {
      method: 'POST',
      data,
    }
  )
