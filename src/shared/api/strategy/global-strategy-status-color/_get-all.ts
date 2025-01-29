import { GlobalStrategyStatusColor } from '..'
import { request } from '@/shared/api/request'

export const getAll = async () =>
  request<never, GlobalStrategyStatusColor[]>('global_strategy_status_colors/', {})
