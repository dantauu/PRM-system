import { request } from '../request'
import { CreateContactData } from './types'
import { createEffect } from 'effector'

type CreateData = Array<CreateContactData>

export const create = createEffect((data: CreateData) =>
  request<CreateData, unknown>(`contacts/`, { method: 'POST', data })
)
