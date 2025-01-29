import { request } from '../request'
import { UpdateContactData } from './types'
import { myMoment } from '@/shared/tools'
import { createEffect } from 'effector'

type UpdateContact = Omit<UpdateContactData, 'contact_id'>

export const update = createEffect(({ contact_id, birth_date, ...data }: UpdateContactData) => {
  const validBirthDate = myMoment(birth_date).format('YYYY-MM-DDTHH:mm:ss.SSS')

  return request<UpdateContact, unknown>(`contacts/${contact_id}`, {
    method: 'PUT',
    data: { birth_date: validBirthDate, ...data },
  })
})
