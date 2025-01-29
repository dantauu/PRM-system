import { contact } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'

const getFx = attach({ effect: contact.getCount })

const $count = createStore<number>(0)

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
  fn: ({ count }) => count,
  target: $count,
})

export const $$contactCount = {
  $count,
  $pending,

  submited,
  reload,

  done: getFx.done,
}
