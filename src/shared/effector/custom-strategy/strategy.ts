import { $$app } from '../app'
import { CustomStrategy, customStrategy } from '@/shared/api'
import { GetAllFactory } from '@/shared/factories'
import { GetOneFactory } from '@/shared/factories/get-one'
import { combine, createEvent, createStore, sample } from 'effector'

//* ---------- Get All ----------
const getAll = GetAllFactory({
  name: 'CUSTOM_STRATEGY',
  api: customStrategy.getAll,
})

const $activeItemId = createStore<number | null>(null)
const $activeItem = combine(
  getAll.$items,
  $activeItemId,
  (items, id) =>
    (items.find((item) => item.custom_strategy_id === id) || null) as CustomStrategy | null
)

const activeChanged = createEvent<number>()

$activeItemId.on(activeChanged, (_, value) => value)

sample({
  clock: $$app.started,
  target: getAll.submited,
})

sample({
  clock: getAll.done,
  filter: (items) => !!items.length,
  fn: (items) => items[0].custom_strategy_id,
  target: activeChanged,
})

//* ---------- Get One ----------
const getOne = GetOneFactory({
  name: 'CUSTOM_STRATEGY',
  api: customStrategy.getOne,
})

export const $$customStrategy = {
  getAll: { ...getAll, $activeItemId, $activeItem, activeChanged },
  getOne,
}
