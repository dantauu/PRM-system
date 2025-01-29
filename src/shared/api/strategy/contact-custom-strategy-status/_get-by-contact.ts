import { ContactCustomStrategyStatus } from '..'
import { request } from '@/shared/api/request'

interface GetByContactRequets {
  strategy_id: number
  contact_id: number
}

export const getByContact = async ({ strategy_id, contact_id }: GetByContactRequets) =>
  request<never, ContactCustomStrategyStatus>(
    `contact_custom_strategy_statuses/${strategy_id}/${contact_id}`,
    {}
  )
