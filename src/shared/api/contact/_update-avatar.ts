import { request } from '../request'
import { createEffect } from 'effector'

export const updateAvatar = createEffect(
  ({ contact_id, avatar }: { contact_id: number; avatar: FormData }) => {
    return request<unknown, unknown>(`contacts/${contact_id}/avatar`, {
      method: 'PUT',
      data: avatar,
    })
  }
)
