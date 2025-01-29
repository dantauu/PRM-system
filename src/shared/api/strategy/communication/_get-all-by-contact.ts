import { Communication } from '..'
import { request } from '@/shared/api/request'

export interface GetAllCommunicationsByContactRequets {
  strategy_id: number
  contact_id: number
}

export const getAllByContact = async ({
  strategy_id,
  contact_id,
}: GetAllCommunicationsByContactRequets) =>
  request<never, Communication[]>(`communications/${strategy_id}/contact/${contact_id}`, {})
