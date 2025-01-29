import { $$session } from '../session'
import { $$activeContact } from '@/entities/contact/model'
import { communication } from '@/shared/api'
import { CustomStrategy } from '@/shared/api'
import { Contact } from '@/shared/api/contact/types'
import { $$activeStrategy } from '@/shared/effector'
import { CreateFactory, GetAllFactory } from '@/shared/factories'
import { createEvent, sample } from 'effector'
import { combineEvents } from 'patronum'

//* Get All
const getAll = GetAllFactory({
  name: 'COMMUNICATION',
  api: communication.getAll,
})

//* Create
const create = CreateFactory({
  name: 'COMMUNICATION',
  api: communication.create,
  useDebug: true,
})

//* Events
const submitWithContact = createEvent<Contact>()
const submitWithStrategy = createEvent<CustomStrategy>()

const allLoaded = combineEvents({
  events: {
    contact: $$activeContact.done,
    strategy: $$activeStrategy.requestes.strategy.done,
  },
})

sample({
  clock: $$session.authed,
  target: getAll.submited,
})

sample({
  clock: allLoaded,
  fn: ({ contact, strategy }) => ({
    contact_id: contact.contact_id,
    strategy_id: strategy.custom_strategy_id,
  }),
  target: getAll.submited,
})

sample({
  clock: $$activeContact.done,
  target: submitWithContact,
})

sample({
  clock: submitWithContact,
  source: $$activeStrategy.$strategy,
  filter: (item) => Boolean(item),
  fn: (strategy, contact) => ({
    contact_id: contact.contact_id,
    strategy_id: strategy.custom_strategy_id,
  }),
  target: getAll.submited,
})

sample({
  clock: $$activeStrategy.requestes.strategy.done,
  target: submitWithStrategy,
})

sample({
  clock: submitWithStrategy,
  source: $$activeContact.$item,
  filter: (item) => Boolean(item),
  fn: (contact, strategy) => ({
    contact_id: contact.contact_id,
    strategy_id: strategy.custom_strategy_id,
  }),
  target: getAll.submited,
})

export const $$communication = {
  getAll,
  create,

  submitWithContact,
}
