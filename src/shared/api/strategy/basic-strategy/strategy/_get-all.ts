import { BasicStrategy } from '..'
import { request } from '@/shared/api/request'

export const getAll = async () => request<never, BasicStrategy[]>('basic_strategies/', {})
