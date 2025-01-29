import { ContactWithInfo, communication, contact } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { attach, createEvent, createStore, restore, sample } from 'effector'

const getLastFx = attach({ effect: contact.getLast })
const getLastContactCommunicationsFx = attach({ effect: communication.getAllByContactIdFx })

const $item = createStore<ContactWithInfo | null>(null)

const $communications = restore(getLastContactCommunicationsFx, [])

const $pending = getLastFx.pending

const submited = createEvent()

sample({
  clock: $item.updates,
  source: $item,
  fn: (item) => item.contact_id,
  target: getLastContactCommunicationsFx,
})

// Authed
sample({
  clock: $$session.authed,
  target: submited,
})

// Submited
sample({
  clock: submited,
  target: getLastFx,
})

// Done
sample({
  clock: getLastFx.doneData,
  target: $item,
})

export const $$lastContact = {
  $item,
  $pending,

  submited,

  done: getLastFx.done,

  $communications,
}
