import { finance } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'
import { $$alerts } from '@/shared/effector'

const getBalanceFx = attach({ effect: finance.getBalance })
const withdrawFx = attach({ effect: finance.withdraw })

const $balance = createStore<number>(0)
const $value = createStore<number>(0)

const $pending = getBalanceFx.pending

const valueChanged = createEvent<number>()

const submited = createEvent()

// Authed
sample({
  clock: $$session.authed,
  target: getBalanceFx,
})

$balance.on(getBalanceFx.doneData, (_, res) => res.balance);
$value.on(valueChanged, (_, payload) => payload)

// Submited
sample({
  clock: submited,
  source: {total: $value},
  target: withdrawFx,
})

// Submited
sample({
  clock: withdrawFx.done,
  source: $pending,
  filter: (pending) => !pending,
  target: getBalanceFx,
})

sample({
  clock: withdrawFx.done,
  fn: () => 'Заявка на вывод создана',
  target: $$alerts.showSuccess,
  })
  
  sample({
  clock: withdrawFx.failData,
  fn: () => 'Заявка на вывод не создана',
  target: $$alerts.showDanger,
  })

// Done
sample({
  clock: getBalanceFx.doneData,
  fn: ({ balance }) => balance,
  target: $value,
})

export const $$balance = {
  $balance,
  
  $value,
  valueChanged,

  $pending,

  submited,
}
