import { Communication } from '..'
import { CreateCommunication } from './types'
import { request } from '@/shared/api/request'

type CreateCommunicationData = CreateCommunication

export const create = async ({ ...data }: CreateCommunicationData) =>
  request<CreateCommunicationData, Communication>(`communications/`, {
    method: 'POST',
    data,
  })
