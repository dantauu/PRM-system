import { CustomStrategyStep, UpdateCustomStrategyStep } from '..'
import { request } from '@/shared/api/request'

type UpdateCustomStrategyStepData = Omit<UpdateCustomStrategyStep, 'custom_strategy_step_id'>

export const update = async ({ custom_strategy_step_id, ...data }: UpdateCustomStrategyStep) =>
  request<UpdateCustomStrategyStepData, CustomStrategyStep>(
    `custom_strategies/steps/${custom_strategy_step_id}`,
    {
      method: 'PUT',
      data,
    }
  )
