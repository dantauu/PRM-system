import {
  CustomStrategy,
  contactCustomStrategyStatus,
  customStrategyStatus,
  customStrategyStep,
  customStrategyStepResult,
} from '@/shared/api'
import {
  DCustomStrategy,
  DCustomStrategyContactFactory,
  DCustomStrategyFactory,
  DCustomStrategyStatusFactory,
  DCustomStrategyStepFactory,
  DCustomStrategyStepResultFactory,
} from '@/shared/domain'
import { $$customStrategy } from '@/shared/effector'
import { GetAllFactory, RequestFactory } from '@/shared/factories'
import { combine, createEffect, createEvent, createStore, sample } from 'effector'

interface StrategyUpdate {
  strategies: DCustomStrategy[]
  strategy: DCustomStrategy
}

const api = async (strategies: CustomStrategy[]) => {
  return Promise.all(strategies.map(StrategyFactory))
}

const getAll = GetAllFactory({
  name: 'DOMAIN_CUSTOM_STRATEGY',
  api,
})

const getContacts = RequestFactory({
  name: 'DOMAIN_CUSTOM_STRATEGY_CONTACT',
  api: contactCustomStrategyStatus.getAll,
})

//* Stores
const $activeItemId = createStore<number | null>(null)
const $activeItem = combine(
  getAll.$items,
  $activeItemId,
  (items, id) =>
    (items.find((item) => item.custom_strategy_id === id) || null) as DCustomStrategy | null
)

//* Events
const activeChanged = createEvent<number>()

//* Effects
const strategyUpdateFx = createEffect(({ strategies, strategy }: StrategyUpdate) => {
  const index = strategies.findIndex(
    ({ custom_strategy_id }) => strategy.custom_strategy_id === custom_strategy_id
  )

  if (index === -1) {
    return strategies
  }

  const cloned = [...strategies]
  cloned.splice(index, 1, strategy)
  return cloned
})

//* Logic
$activeItemId.on(activeChanged, (_, value) => value)

// Strategies
sample({
  clock: [$$customStrategy.getAll.done],
  source: $$customStrategy.getAll.$items,
  target: getAll.submited,
})

sample({
  clock: getAll.done,
  filter: (items) => !!items.length,
  fn: (items) => items[0].custom_strategy_id,
  target: activeChanged,
})

// Contacts
sample({
  clock: getContacts.done,
  source: { strategies: getAll.$items, strategy: $activeItem },
  fn: ({ strategies, strategy }, contacts) => ({
    strategies,
    strategy: { ...strategy, contacts: contacts.items.map(DCustomStrategyContactFactory) },
  }),
  target: strategyUpdateFx,
})

sample({
  clock: strategyUpdateFx.doneData,
  target: getAll.$items,
})

export const $$dCustomStrategy = {
  getAll: {
    ...getAll,
    getContacts,
    $activeItemId,
    $activeItem,
    activeChanged,
  },
}

//* Получить все стратегии
//* Для каждой получить все статусы, результаты и шаги
//* Сгруппировать каждую по отдельности

async function StrategyFactory(strategy: CustomStrategy) {
  const [stepsData, resultsData, statusesData, contactsData] = await LoadStrategyData(strategy)

  const statuses = statusesData.map((status) => DCustomStrategyStatusFactory({ status }))
  const results = resultsData.map((result) =>
    DCustomStrategyStepResultFactory({
      result,
      status: statuses.find(
        (status) => status.custom_strategy_status_id === result.custom_strategy_status_id
      ),
    })
  )
  const steps = stepsData.map((step) =>
    DCustomStrategyStepFactory({
      step,
      results: results.filter(
        (result) => result.custom_strategy_step_id === step.custom_strategy_step_id
      ),
    })
  )
  const contacts = contactsData.items.map(DCustomStrategyContactFactory)

  return DCustomStrategyFactory({
    strategy,
    steps,
    statuses,
    contacts,
  })
}

async function LoadStrategyData(strategy: CustomStrategy) {
  return Promise.all([
    customStrategyStep.getAll(strategy.custom_strategy_id),
    customStrategyStepResult.getAll(strategy.custom_strategy_id),
    customStrategyStatus.getAll(strategy.custom_strategy_id),
    contactCustomStrategyStatus.getAll({ strategy_id: strategy.custom_strategy_id }),
  ])
}
