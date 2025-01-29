import { $$activeContact } from '@/entities/contact/model'
import { Communication, CustomStrategy, communication } from '@/shared/api'
import { Contact } from '@/shared/api/contact/types'
import { $$activeStrategy, $$session } from '@/shared/effector'
import { GetAllFactory } from '@/shared/factories'
import { createEvent, createStore, sample } from 'effector'
import { combineEvents } from 'patronum'

//* Factories
const getAllCommunications = GetAllFactory({
  name: 'CONTACTS_COMMUNICATIONS',
  api: communication.getAll,
  useDebug: true,
})

//* Stores
const $maxHeight = createStore<number>(300)

//* Events
const submitWithContact = createEvent<Contact>()
const submitWithStrategy = createEvent<CustomStrategy>()
const maxHeightChanged = createEvent<number>()

const allLoaded = combineEvents({
  events: {
    contact: $$activeContact.done,
    strategy: $$activeStrategy.requestes.strategy.done,
  },
})

//* Logic
$maxHeight.on(maxHeightChanged, (_, value) => value)

sample({
  clock: allLoaded,
  fn: ({ contact, strategy }) => ({
    contact_id: contact.contact_id,
    strategy_id: strategy.custom_strategy_id,
  }),
  target: getAllCommunications.submited,
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
  target: getAllCommunications.submited,
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
  target: getAllCommunications.submited,
})

export const $$contactsCommunications = {
  ...getAllCommunications,

  $maxHeight,

  maxHeightChanged,
  submitWithContact,
}
