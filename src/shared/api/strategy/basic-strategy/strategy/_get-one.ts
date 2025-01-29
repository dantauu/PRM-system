import { BasicStrategy } from '..'
import { request } from '@/shared/api/request'

export const getOne = async (strategy_id: number) =>
  request<never, BasicStrategy>(`basic_strategies/${strategy_id}`, {})
