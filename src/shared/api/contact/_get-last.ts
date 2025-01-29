import { request } from '../request'
import { ContactWithInfo } from './types'
import { createEffect } from 'effector'

type GetLastResponse = ContactWithInfo

export const getLast = createEffect(() =>
  request<never, GetLastResponse>('contacts/last', { method: 'GET' })
)
