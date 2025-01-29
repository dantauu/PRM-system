import { pools } from '@/shared/api/pools'
import { $$session } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'

const getPoolsFx = attach({ effect: pools.getPools })

const $items = createStore([])
$items.on(getPoolsFx.doneData, (_, payload) => payload)

const $pending = getPoolsFx.pending

const submited = createEvent()

// Authed
sample({
  clock: $$session.authed,
  target: submited,
})

// Submited
sample({
  clock: submited,
  target: getPoolsFx,
})

export const $$pools = {
  $items,

  $pending,

  submited,
}
