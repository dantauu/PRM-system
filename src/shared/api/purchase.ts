import { request } from './request'
import { createEffect } from 'effector'

interface TotalResponse {
  total_purchases: number
}

const getTotal = createEffect(() =>
  request<never, TotalResponse>('purchases/referred/current/total', { method: 'GET' })
)

export const purchase = {
  getTotal,
}
