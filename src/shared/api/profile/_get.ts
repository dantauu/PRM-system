import { request } from '../request'
import { Profile } from './types'
import { createEffect } from 'effector'

type GetResponse = Profile

export const get = createEffect(() => request<never, GetResponse>('profiles/', { method: 'GET' }))
