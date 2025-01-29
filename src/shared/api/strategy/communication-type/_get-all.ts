import { CommunicationType } from '..'
import { request } from '../../request'

export const getAll = async () => request<never, CommunicationType[]>('communication_types/', {})
