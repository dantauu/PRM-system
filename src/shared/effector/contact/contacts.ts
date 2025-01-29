import { ContactWithInfo, contact } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'

const getFx = attach({ effect: contact.get })

const $items = createStore<ContactWithInfo[]>([])
const $length = $items.map((items) => items.length)

const $pending = getFx.pending

const submited = createEvent()
const reload = createEvent()

// Authed
sample({
  clock: $$session.authed,
  target: submited,
})

// Submited
sample({
  clock: [submited, reload],
  target: getFx,
})

// Done
sample({
  clock: getFx.doneData,
  target: $items,
})

export const $$contacts = {
  $items,
  $length,
  $pending,

  submited,
  reload,

  done: getFx.done,
}
