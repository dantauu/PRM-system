import { CustomStrategy, UpdateCustomStrategy } from '..'
import { request } from '@/shared/api/request'

type UpdateCustomStrategyData = Omit<UpdateCustomStrategy, 'custom_strategy_id'>

export const update = async ({ custom_strategy_id, ...data }: UpdateCustomStrategy) => {

  // console.log("запрос update выполнился")

  return request<UpdateCustomStrategyData, CustomStrategy>(`custom_strategies/${custom_strategy_id}`, {
    method: 'PUT',
    data,
  })
}

