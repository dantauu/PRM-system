import { Landing, landing } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'

const getFx = attach({ effect: landing.get })

const $item = createStore<Landing | null>(null)

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
  target: $item,
})

export const $$myLanding = {
  $item,
  $pending,

  submited,
  reload,

  done: getFx.done,
}
