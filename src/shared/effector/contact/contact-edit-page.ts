import { ContactWithInfo, contact } from '@/shared/api'
import { attach, createEvent, createStore, sample } from 'effector'
import { reset } from 'patronum'

const getItemFx = attach({ effect: contact.getItem })

const $contact = createStore<ContactWithInfo | null>(null)

const $pending = getItemFx.pending

const submited = createEvent<number>()
const reload = createEvent()
const reseted = createEvent()

// Submited
sample({
  clock: submited,
  fn: (id) => ({ id }),
  target: getItemFx,
})

// Reload
sample({
  clock: reload,
  source: $contact,
  filter: (contact) => !!contact,
  fn: (contact) => ({ id: (contact as ContactWithInfo).contact_id }),
  target: getItemFx,
})

// Done
sample({
  clock: getItemFx.doneData,
  target: $contact,
})

// Resetes
reset({
  clock: reseted,
  target: [$contact],
})

export const $$contactEditPage = {
  $contact,
  $pending,

  submited,
  reload,
  reseted,

  done: getItemFx.done,
  doneData: getItemFx.doneData,
}
