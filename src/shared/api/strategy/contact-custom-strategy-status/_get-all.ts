import { ContactCustomStrategyStatus } from '..'
import { request } from '@/shared/api/request'

interface GetAll {
  strategy_id: number
  offset?: number
  limit?: number
}

interface GetAllResponse {
  items: ContactCustomStrategyStatus[]
  count: number
}

export const getAll = async ({ strategy_id, ...params }: GetAll) =>
  request<never, GetAllResponse>(`contact_custom_strategy_statuses/${strategy_id}`, { params })
