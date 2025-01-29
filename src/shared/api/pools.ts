import { request } from './request'
import { createEffect } from 'effector'

interface PoolsResponse {
  value: number
  available: boolean
  amount: number
}

export const getPools = createEffect(() =>
  request<never, PoolsResponse[]>('pools/', { method: 'GET' })
)
export const pools = {
  getPools,
}
