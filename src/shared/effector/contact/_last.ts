import { contact } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { GetOneFactory } from '@/shared/factories'
import { sample } from 'effector'

//* Factories
const getOne = GetOneFactory({
  name: 'LAST_CONTACT',
  api: contact.getLast,
})

//* Logic
sample({
  clock: $$session.authed,
  target: getOne.submited,
})

export const $$lastContact = getOne
