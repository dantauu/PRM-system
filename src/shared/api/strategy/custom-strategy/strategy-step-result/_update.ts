import { CustomStrategyStepResult, UpdateCustomStrategyStepResult } from '..'
import { request } from '@/shared/api/request'

type UpdateCustomStrategyStepResultData = Omit<
  UpdateCustomStrategyStepResult,
  'custom_strategy_step_result_id'
>

export const update = async ({
  custom_strategy_step_result_id,
  ...data
}: UpdateCustomStrategyStepResult) =>
  request<UpdateCustomStrategyStepResultData, CustomStrategyStepResult>(
    `custom_strategies/results/${custom_strategy_step_result_id}`,
    {
      method: 'PUT',
      data,
    }
  )
