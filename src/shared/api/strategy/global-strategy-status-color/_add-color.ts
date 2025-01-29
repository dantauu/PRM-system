import { GlobalStrategyStatusColor } from './types'
import { request } from '@/shared/api/request'

interface AddColorPayload {
  color_HEX: string
}

export const addColor = async (payload: AddColorPayload) =>
  request<AddColorPayload, GlobalStrategyStatusColor>('global_strategy_status_colors/', {
    method: 'POST',
    data: payload,
  })
