import { request } from '../request'
import { ContactWithInfo } from './types'
import { createEffect } from 'effector'

interface GetItemData {
  id: number
}

type GetItemResponse = ContactWithInfo

export const getItem = createEffect(({ id }: GetItemData) =>
  request<never, GetItemResponse>(`contacts/${id}`, { method: 'GET' })
)
