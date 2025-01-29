import { request } from '../request'
import { createEffect } from 'effector'

export const updateAvatar = createEffect(({ avatar }: { avatar: FormData }) => {
  return request<unknown, unknown>(`profiles/avatar`, {
    method: 'PUT',
    data: avatar,
  })
})
