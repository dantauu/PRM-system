import { contact } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { GetOneFactory } from '@/shared/factories'
import { sample } from 'effector'

//* Factories
const { $item, ...getOne } = GetOneFactory({
  name: 'CONTACTS_COUNT',
  api: contact.getCount,
})

//* Stores
const $value = $item.map((item) => item?.count ?? 0)

//* Logic
sample({
  clock: $$session.authed,
  target: getOne.submited,
})

export const $$contactsCount = { ...getOne, $value }
