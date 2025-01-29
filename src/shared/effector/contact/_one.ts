import { contact } from '@/shared/api'
import { GetOneFactory } from '@/shared/factories'

//* Factories
const getOne = GetOneFactory({
  name: 'CONTACT',
  api: contact.getItem,
})

export const $$contact = getOne
