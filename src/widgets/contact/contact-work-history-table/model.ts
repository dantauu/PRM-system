import { $$activeContact } from '@/entities/contact/model'
import { CustomStrategy, communication } from '@/shared/api'
import { Contact } from '@/shared/api/contact/types'
import { $$activeStrategy } from '@/shared/effector'
import { GetAllFactory } from '@/shared/factories'
import { createEvent, createStore, sample } from 'effector'
import { combineEvents } from 'patronum'

//* Factories
const getCommunications = GetAllFactory({
  name: 'ACTIVE_CONTACT_COMMUNICATIONS',
  api: communication.getAllByContact,
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
  target: getCommunications.submited,
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
  target: getCommunications.submited,
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
  target: getCommunications.submited,
})

export const $$activeContactCommunications = {
  ...getCommunications,

  $maxHeight,

  maxHeightChanged,
  submitWithContact,
}
