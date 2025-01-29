import { customStrategy } from '@/shared/api'
import { $$activeStrategy, $$alerts, $$customStrategies } from '@/shared/effector'
import { RequestFactory } from '@/shared/factories'
import { combine, createEvent, createStore, sample } from 'effector'
import { spread } from 'patronum'

const update = RequestFactory({
  name: 'UPDATE_CUSTOM_STRATEGY',
  api: customStrategy.update,
})

const $strategy = $$activeStrategy.$strategy

const $name = createStore<string>('')
const $description = createStore<string>('')
const $canSubmit = combine($name, (name) => !!name)

const opened = createEvent()

const nameChanged = createEvent<string>()
const descriptionChanged = createEvent<string>()

const submited = createEvent()

$name.on(nameChanged, (_, value) => value)
$description.on(descriptionChanged, (_, value) => value)

sample({
  clock: [$strategy.updates, opened],
  source: $strategy,
  filter: (strategy) => Boolean(strategy),
  target: spread({
    targets: {
      name: nameChanged,
      description: descriptionChanged,
    },
  }),
})

sample({
  clock: submited,
  source: {
    strategy: $strategy,
    name: $name,
    description: $description,
  },
  filter: $canSubmit,
  fn: ({ strategy, name, description }) => ({
    custom_strategy_id: strategy.custom_strategy_id,
    language_id: strategy.language_id,
    name,
    description,
    image: strategy.image,
  }),
  target: update.submited,
})

sample({
  clock: update.done,
  fn: (strategy) => strategy.custom_strategy_id,
  target: [$$activeStrategy.requestes.strategy.submited, $$customStrategies.submited],
})

sample({
  clock: update.done,
  fn: () => 'Изменения сохранены',
  target: $$alerts.showSuccess,
})

export const $$editStrategyModal = {
  ...update,
  $name,
  $description,
  $canSubmit,

  opened,
  nameChanged,
  descriptionChanged,

  submited,
}
