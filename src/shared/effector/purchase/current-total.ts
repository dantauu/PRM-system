import { purchase } from '@/shared/api/purchase'
import { $$session } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'

const getCurrentTotalFx = attach({ effect: purchase.getTotal })

const $value = createStore<number>(0)

const $pending = getCurrentTotalFx.pending

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
  target: getCurrentTotalFx,
})

// Done
sample({
  clock: getCurrentTotalFx.doneData,
  fn: ({ total_purchases }) => total_purchases,
  target: $value,
})

export const $$currentTotal = {
  $value,

  $pending,

  submited,
}
