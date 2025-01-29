import { $$customStrategy } from './strategy'
import { CustomStrategyStep, customStrategyStep } from '@/shared/api'
import { GetAllFactory } from '@/shared/factories'
import { sample } from 'effector'

const strategies = $$customStrategy.getAll

//* ---------- Get All Of Strategies ----------
const getAll = GetAllFactory({
  name: 'CUSTOM_STRATEGY_STEP',
  api: customStrategyStep.getAllOfStrategies,
})

type LinkedToStrategiesItems = Record<number, CustomStrategyStep[]>

const $linkedToStrategiesItems = getAll.$items.map((state) =>
  state.reduce((t, c) => {
    if (!c.length) {
      return
    }
    const [firstStep] = c
    t[firstStep.custom_strategy_id] = c
    return t as LinkedToStrategiesItems
  }, {} as LinkedToStrategiesItems)
)

sample({
  clock: strategies.done,
  fn: (strategies) => ({ ids: strategies.map((strategy) => strategy.custom_strategy_id) }),
  target: getAll.submited,
})

export const $$customStrategyStep = {
  getAllOfStrategies: {
    $linkedToStrategiesItems,
    ...getAll,
  },
}
