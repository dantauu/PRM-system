import { CustomStrategyStatus } from '..'
import { request } from '@/shared/api/request'

export const getAll = async (strategy_id: number) =>
  request<never, CustomStrategyStatus[]>(`custom_strategies/${strategy_id}/statuses`, {})
