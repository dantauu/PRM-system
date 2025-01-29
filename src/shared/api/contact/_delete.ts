import { request } from '../request'
import { DeleteData } from './types'
import { createEffect } from 'effector'

export const deleteContact = createEffect(({ contact_id }: { contact_id: number }) => {
  return request<DeleteData, unknown>(`contacts/${contact_id}`, {
    method: 'DELETE',
  })
})
