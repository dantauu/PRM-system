import { request } from '../request'
import { createEffect } from 'effector'

interface GetCountResponse {
  count: number
}

export const getCount = createEffect(() =>
  request<never, GetCountResponse>('contacts/count', { method: 'GET' })
)
