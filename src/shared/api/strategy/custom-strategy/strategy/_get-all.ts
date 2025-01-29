import { CustomStrategy } from '..'
import { request } from '@/shared/api/request'

export const getAll = async () => request<never, CustomStrategy[]>('custom_strategies/', {})
