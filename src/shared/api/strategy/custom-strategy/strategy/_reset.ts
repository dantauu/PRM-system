import { CustomStrategy, ResetCustomStrategy } from '..'
import { request } from '@/shared/api/request'

export const reset = async ({ custom_strategy_id }: ResetCustomStrategy) =>
  request<never, CustomStrategy>(`custom_strategies/${custom_strategy_id}/reset`, {
    method: 'POST',
  })
