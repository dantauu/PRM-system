import { CreateContactData, contact } from '@/shared/api'
import { $$alerts, $$contactCount, $$contacts, $$lastContact } from '@/shared/effector'
import { attach, createEvent, sample } from 'effector'

const createFx = attach({ effect: contact.create })

const $pending = createFx.pending

const submited = createEvent<CreateContactData[]>()

// Submited
sample({
  clock: submited,
  target: createFx,
})

// Done
sample({
  clock: createFx.done,
  fn: () => 'Контакты успешно импортированы',
  target: $$alerts.showSuccess,
})

sample({
  clock: createFx.done,
  target: $$contactCount.submited,
})

sample({
  clock: createFx.done,
  target: $$contacts.submited,
})

sample({
  clock: createFx.done,
  target: $$lastContact.submited,
})

export const $$importContacts = {
  $pending,

  submited,

  done: createFx.done,
  fail: createFx.fail,
}
