import { CustomStrategy } from '..'
import { request } from '@/shared/api/request'

export const getOne = async (strategy_id: number) =>
  request<never, CustomStrategy>(`custom_strategies/${strategy_id}`, {})
