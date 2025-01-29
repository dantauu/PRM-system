import { $$customStrategy } from './strategy'
import { CustomStrategyStatus, customStrategyStatus } from '@/shared/api'
import { GetAllFactory } from '@/shared/factories'
import { sample } from 'effector'

const strategies = $$customStrategy.getAll

//* ---------- Get All Of Strategies ----------
const getAll = GetAllFactory({
  name: 'CUSTOM_STRATEGY_STATUS',
  api: customStrategyStatus.getAllOfStrategies,
})

export type LinkedToStrategiesStatuses = Record<number, CustomStrategyStatus[]>

const $linkedToStrategiesItems = getAll.$items.map((state) =>
  state.reduce((t, c) => {
    if (!c.length) {
      return
    }
    const [firstStep] = c
    t[firstStep.custom_strategy_id] = c
    return t as LinkedToStrategiesStatuses
  }, {} as LinkedToStrategiesStatuses)
)

sample({
  clock: strategies.done,
  fn: (strategies) => ({ ids: strategies.map((strategy) => strategy.custom_strategy_id) }),
  target: getAll.submited,
})

export const $$customStrategyStatus = {
  getAllOfStrategies: {
    $linkedToStrategiesItems,
    ...getAll,
  },
}
