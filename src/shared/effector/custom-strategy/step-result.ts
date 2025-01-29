import { $$customStrategy } from './strategy'
import { CustomStrategyStepResult } from '@/shared/api'
import { customStrategyStepResult } from '@/shared/api/strategy/custom-strategy/strategy-step-result'
import { GetAllFactory } from '@/shared/factories'
import { createStore, sample } from 'effector'

const strategies = $$customStrategy.getAll

//* ---------- Get All Of Strategies ----------
const getAll = GetAllFactory({
  name: 'CUSTOM_STRATEGY_STEP_RESULT',
  api: customStrategyStepResult.getAllOfStrategies,
})

type LinkedToStrategiesItems = Record<number, CustomStrategyStepResult[]>

const $linkedToStrategiesItems = createStore<LinkedToStrategiesItems>({})

// Strategies Done
sample({
  clock: strategies.done,
  fn: (strategies) => ({ ids: strategies.map((strategy) => strategy.custom_strategy_id) }),
  target: getAll.submited,
})

// Done
sample({
  clock: getAll.done,
  source: getAll.$params,
  fn: (params, results) =>
    params.ids.reduce((t, c, index) => {
      if (!results[index].length) {
        return
      }
      t[c] = results[index]
      return t as LinkedToStrategiesItems
    }, {} as LinkedToStrategiesItems),
})

export const $$customStrategyStepResult = {
  getAllOfStrategies: {
    $linkedToStrategiesItems,
    ...getAll,
  },
}
