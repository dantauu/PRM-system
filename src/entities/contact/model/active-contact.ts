import { contact } from '@/shared/api'
import { GetOneFactory } from '@/shared/factories'

const getContact = GetOneFactory({
  name: 'ACTIVE_CONTACT',
  api: contact.getItem,
})

export const $$activeContact = getContact
