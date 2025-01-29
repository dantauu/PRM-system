import { request } from '../request'
import { ContactWithInfo } from './types'
import { createEffect } from 'effector'

type GetResponse = ContactWithInfo[]

export const getAll = createEffect(() =>
  request<never, GetResponse>('contacts/', { method: 'GET' })
)
