import { request } from '../request'
import { createEffect } from 'effector'

interface GetLoginResponse {
  login: string
}

export const getLogin = createEffect(() =>
  request<never, GetLoginResponse>('profiles/login', { method: 'GET' })
)
