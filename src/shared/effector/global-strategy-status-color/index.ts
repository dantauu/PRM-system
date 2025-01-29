import { $$app } from '../app'
import { globalStrategyStatusColor } from '@/shared/api'
import { GetAllFactory, RequestFactory } from '@/shared/factories'
import { sample } from 'effector'

interface AddColorPayload {
  color_HEX: string
}

interface AddColorResponse {
  global_strategy_status_color_id: number
  color_HEX: string
}

//* Get All
const getAll = GetAllFactory({
  name: 'GLOBAL_STRATEGY_STATUS_COLOR',
  api: globalStrategyStatusColor.getAll,
})

const postColor = RequestFactory<AddColorPayload, AddColorResponse>({
  name: 'ADD_GLOBAL_STRATEGY_STATUS_COLOR',
  api: globalStrategyStatusColor.addColor,
})

type DictionaryById = Record<number, string>
const $dictionaryById = getAll.$items.map((colors) =>
  colors.reduce(
    (t, c) => ({ ...t, [c.global_strategy_status_color_id]: c.color_HEX }),
    {} as DictionaryById
  )
)
sample({
  clock: postColor.done,
  fn: (): undefined => undefined, // Возвращаем `undefined` для запуска getAll.submited
  target: getAll.submited,
})

sample({
  clock: $$app.started,
  target: getAll.submited,
})

export const $$globalStrategyStatusColor = { getAll: { ...getAll, $dictionaryById }, postColor }
