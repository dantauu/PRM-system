import { $$session } from '../session'
import { $$customStrategies } from './strategies'
import {
  CustomStrategy,
  CustomStrategyStatus,
  CustomStrategyStep,
  CustomStrategyStepResult,
  customStrategy,
  customStrategyStatus,
  customStrategyStep,
  customStrategyStepResult,
} from '@/shared/api'
import { Cache, CacheFactory, GetAllFactory, GetOneFactory, Request } from '@/shared/factories'
import { Event, Store, StoreWritable, createEvent, createStore, sample } from 'effector'

//* Cache
const strategyCache = CacheFactory<CustomStrategy>({
  name: 'CUSTOM_STRATEGY',
  reset: $$session.logouted,
})

const stepsCache = CacheFactory<CustomStrategyStep[]>({
  name: 'CUSTOM_STRATEGY_STEPS',
  reset: $$session.logouted,
})

const stepResultsCache = CacheFactory<CustomStrategyStepResult[]>({
  name: 'CUSTOM_STRATEGY_STEP_RESULTS',
  reset: $$session.logouted,
})

const statusesCache = CacheFactory<CustomStrategyStatus[]>({
  name: 'CUSTOM_STRATEGY_STATUSES',
  reset: $$session.logouted,
})

//* Factories
const getStrategy = GetOneFactory({
  name: 'CUSTOM_STRATEGY',
  api: customStrategy.getOne,
})

const getSteps = GetAllFactory({
  name: 'CUSTOM_STRATEGY_STEPS',
  api: customStrategyStep.getAll,
})

const getStepResults = GetAllFactory({
  name: 'CUSTOM_STRATEGY_STEP_RESULTS',
  api: customStrategyStepResult.getAll,
})

const getStatuses = GetAllFactory({
  name: 'CUSTOM_STRATEGY_STATUSES',
  api: customStrategyStatus.getAll,
})

//* Stores
const $activeStrategyId = createStore<number | null>(null)
const $strategy = createStore<CustomStrategy | null>(null)
const $steps = createStore<CustomStrategyStep[]>([])
const $stepResults = createStore<CustomStrategyStepResult[]>([])
const $statuses = createStore<CustomStrategyStatus[]>([])

//* Events
const activeStrategyChanged = createEvent<number>()

//* Logic
$activeStrategyId.on(activeStrategyChanged, (_, id) => id)

sample({
  clock: $$customStrategies.done,
  filter: (items) => !!items.length,
  fn: (items) => items[0].custom_strategy_id,
  target: activeStrategyChanged,
})

setupUnit($activeStrategyId, activeStrategyChanged, $strategy, strategyCache, getStrategy)
setupUnit($activeStrategyId, activeStrategyChanged, $steps, stepsCache, getSteps)
setupUnit($activeStrategyId, activeStrategyChanged, $stepResults, stepResultsCache, getStepResults)
setupUnit($activeStrategyId, activeStrategyChanged, $statuses, statusesCache, getStatuses)

export const $$activeStrategy = {
  requestes: {
    strategy: getStrategy,
    steps: getSteps,
    stepResults: getStepResults,
    statuses: getStatuses,
  },
  $activeStrategyId,
  $strategy,
  $steps,
  $stepResults,
  $statuses,

  $strategyStatus: getStrategy.$status,
  $stepsStatus: getSteps.$status,
  $stepResultsStatus: getStepResults.$status,
  $statusesStatus: getStatuses.$status,

  activeStrategyChanged,
}

//* Utils
function setupUnit<Unit>(
  $id: Store<number>,
  trigger: Event<number>,
  $unit: StoreWritable<Unit>,
  cache: Cache<Unit>,
  request: Request<number, Unit>
) {
  sample({
    clock: trigger,
    source: cache.$cache,
    filter: (map, params) => cache.hasItem(map, params),
    fn: (map, params) => cache.getItem(map, params),
    target: $unit,
  })

  sample({
    clock: trigger,
    target: request.submited,
  })

  sample({
    clock: request.done,
    target: $unit,
  })

  sample({
    clock: request.done,
    source: $id,
    fn: (key, item) => ({ key, item }),
    target: cache.cacheAdded,
  })
}
