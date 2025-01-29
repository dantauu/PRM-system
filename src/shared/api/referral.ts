import { request } from './request'
import { createEffect } from 'effector'

interface ActiveCountResponse {
  count: number
}

const getActiveCount = createEffect(() =>
  request<never, ActiveCountResponse>('referrals/active-count', { method: 'GET' })
)

export const referral = {
  getActiveCount,
}
