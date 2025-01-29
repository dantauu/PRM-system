import { CustomStrategyStep } from '..'
import { request } from '@/shared/api/request'

export const getAll = async (strategy_id: number) =>
  request<never, CustomStrategyStep[]>(`custom_strategies/${strategy_id}/steps`, {})
