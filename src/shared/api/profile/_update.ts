import { request } from '../request'
import { Profile } from './types'
import { myMoment } from '@/shared/tools'
import { createEffect } from 'effector'

interface UpdateData extends Omit<Profile, 'wallet_id'> {
  password: string
}

interface UpdateResponse {
  status: string
}

export const update = createEffect<UpdateData, UpdateResponse, string>(
  ({ birthday, ...data }: UpdateData) => {
    const validBirthday = myMoment(birthday).format('YYYY-MM-DDTHH:mm:ss.SSS')
    return request<UpdateData, UpdateResponse>('profiles', {
      method: 'PUT',
      data: { birthday: validBirthday, ...data },
    })
  }
)
