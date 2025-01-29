import { FinanceHistoryItem, finance } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'

const getHistoryFx = attach({ effect: finance.getHistory })

const $items = createStore<FinanceHistoryItem[]>([])

const $pending = getHistoryFx.pending

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
  target: getHistoryFx,
})

// Done
sample({
  clock: getHistoryFx.doneData,
  fn: ({ history }) => history,
  target: $items,
})

export const $$balanceHistory = {
  $items,

  $pending,

  submited,
}
