import { CreateCustomStrategyStepResult, CustomStrategyStepResult } from '..'
import { request } from '@/shared/api/request'

type CreateCustomStrategyStepResultData = CreateCustomStrategyStepResult

export const create = async (data: CreateCustomStrategyStepResult) =>
  request<CreateCustomStrategyStepResultData, CustomStrategyStepResult>(
    `custom_strategies/results`,
    {
      method: 'POST',
      data,
    }
  )
