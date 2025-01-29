import { finance } from '@/shared/api'
import { attach, createEvent, createStore, sample } from 'effector'

const updateFx = attach({ effect: finance.postCalculateIncomes })

const $strategyId = createStore<number | null>(null)
const $value = createStore({ values: [] })
const $spacedValue = createStore(0)

const strategyIdChanged = createEvent<number>()

$strategyId.on(strategyIdChanged, (_, strategyId) => strategyId)
$value.on(updateFx.doneData, (_, payload) => payload)
$spacedValue.on(updateFx.doneData, (_, payload) =>
  payload.values.reduce((sum, number) => sum + number, 0)
)

const $pending = updateFx.pending

sample({
  clock: strategyIdChanged,
  source: $strategyId,
  filter: (strategyId) => !!strategyId,
  fn: (strategyId) => ({ custom_strategy_id: strategyId }),
  target: updateFx,
})

export const $$PotentialIncome = {
  $strategyId,
  strategyIdChanged,

  $value,
  $spacedValue,
  $pending,
}
