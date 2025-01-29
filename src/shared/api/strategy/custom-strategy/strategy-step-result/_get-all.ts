import { CustomStrategyStepResult } from '..'
import { request } from '@/shared/api/request'

export const getAll = async (strategy_id: number) =>
  request<never, CustomStrategyStepResult[]>(`custom_strategies/${strategy_id}/results`, {})
