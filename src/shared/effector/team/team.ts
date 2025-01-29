import { TeamItem, team } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'

const getFx = attach({ effect: team.get })

const $items = createStore<TeamItem[]>([])
const $length = $items.map((items) => items.length)

const $pending = getFx.pending

const submited = createEvent()

// Authed
sample({
  clock: $$session.authed,
  target: submited,
})

// Submited
sample({
  clock: submited,
  target: getFx,
})

// Done
sample({
  clock: getFx.doneData,
  fn: ({ team }) => team,
  target: $items,
})

export const $$team = {
  $items,
  $length,
  $pending,

  submited,

  done: getFx.done,
}
