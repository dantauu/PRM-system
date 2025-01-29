import { $$alerts } from '../alerts'
import { finance } from '@/shared/api'
import { myMoment } from '@/shared/tools'
import { attach, createEvent, createStore, sample } from 'effector'
import moment from 'moment'

const updateFx = attach({ effect: finance.getReports })

const $strategyId = createStore<number | null>(null)
const $value = createStore([])
const $endDate = createStore(moment().format('YYYY-MM-DD'))
const $startDate = createStore(moment().subtract(1, 'months').format('YYYY-MM-DD'))

const strategyIdChanged = createEvent<number>()
const startDateChanged = createEvent<string>()
const endDateChanged = createEvent<string>()

$strategyId.on(strategyIdChanged, (_, strategyId) => strategyId)
$value.on(updateFx.doneData, (_, payload) => payload)

$startDate.on(startDateChanged, (_, value) =>
  value ? myMoment(value).format('YYYY-MM-DD') : myMoment().format('YYYY-MM-DD')
)
$endDate.on(endDateChanged, (_, value) =>
  value ? myMoment(value).format('YYYY-MM-DD') : myMoment().format('YYYY-MM-DD')
)

const $pending = updateFx.pending

sample({
  clock: strategyIdChanged,
  source: {
    strategyId: $strategyId,
    startDate: $startDate,
    endDate: $endDate,
  },
  filter: (strategyId) => !!strategyId,
  fn: (finance) => ({
    custom_strategy_id: finance.strategyId,
    startDate: finance.startDate,
    endDate: finance.endDate,
  }),
  target: updateFx,
})

sample({
  clock: endDateChanged,
  source: {
    strategyId: $strategyId,
    startDate: $startDate,
    endDate: $endDate,
  },
  filter: (strategyId) => !!strategyId,
  fn: (finance) => ({
    custom_strategy_id: finance.strategyId,
    startDate: finance.startDate,
    endDate: finance.endDate,
  }),
  target: updateFx,
})

sample({
  clock: startDateChanged,
  source: {
    strategyId: $strategyId,
    startDate: $startDate,
    endDate: $endDate,
  },
  filter: (strategyId) => !!strategyId,
  fn: (finance) => ({
    custom_strategy_id: finance.strategyId,
    startDate: finance.startDate,
    endDate: finance.endDate,
  }),
  target: updateFx,
})

sample({
  clock: updateFx.fail,
  fn: () => 'Ошибка',
  target: $$alerts.showDanger,
})

export const $$FinancesStats = {
  $strategyId,
  strategyIdChanged,

  $value,
  $pending,
  $startDate,
  $endDate,

  startDateChanged,
  endDateChanged,
}
