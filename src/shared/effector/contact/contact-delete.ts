import { contact } from '@/shared/api'
import { $$alerts, $$contactCount, $$contacts } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'
import { reset } from 'patronum'

const updateFx = attach({ effect: contact.deleteContact })

const $contactId = createStore<number | null>(null)

const contactIdChanged = createEvent<number>()

$contactId.on(contactIdChanged, (_, contactId) => contactId)

const $pending = updateFx.pending
const $error = createStore<string | null>(null)

const submited = createEvent()
const reseted = createEvent()

// Submited
sample({
  clock: submited,
  source: {
    contact_id: $contactId,
  },
  filter: ({ contact_id }) => !!contact_id,
  fn: (contact) => ({ contact_id: contact.contact_id }),
  target: updateFx,
})

// Done
sample({
  clock: updateFx.done,
  fn: () => 'Контакт удален',
  target: $$alerts.showSuccess,
})

sample({
  clock: updateFx.done,
  target: $$contacts.reload,
})

sample({
  clock: updateFx.done,
  target: $$contactCount.reload,
})

// Reseted
reset({
  clock: reseted,
  target: [$contactId],
})

reset({
  clock: [],
  target: $error,
})

export const $$contactDelete = {
  $contactId,
  contactIdChanged,

  $error,
  $pending,

  submited,
  reseted,
}
