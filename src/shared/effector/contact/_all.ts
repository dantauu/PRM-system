import { contact } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { GetAllFactory } from '@/shared/factories'
import { sample } from 'effector'

//* Factories
const getAll = GetAllFactory({
  name: 'CONTACT',
  api: contact.get,
})

//* Logic
sample({
  clock: $$session.authed,
  target: getAll.submited,
})

export const $$contacts = getAll
