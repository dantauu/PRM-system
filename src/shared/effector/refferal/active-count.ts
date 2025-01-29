import { referral } from '@/shared/api/referral'
import { $$session } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'

const getActiveCountFx = attach({ effect: referral.getActiveCount })

const $value = createStore<number>(0)

const $pending = getActiveCountFx.pending

const submited = createEvent()

// Authed
sample({
  clock: $$session.authed,
  target: submited,
})

// Submited
sample({
  clock: submited,
  source: $pending,
  filter: (pending) => !pending,
  target: getActiveCountFx,
})

// Done
sample({
  clock: getActiveCountFx.doneData,
  fn: ({ count }) => count,
  target: $value,
})

export const $$activeCount = {
  $value,

  $pending,

  submited,
}
