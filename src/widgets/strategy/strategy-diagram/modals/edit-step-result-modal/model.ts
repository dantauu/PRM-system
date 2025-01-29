import { customStrategyStepResult } from '@/shared/api'
import { $$activeStrategy, $$alerts } from '@/shared/effector'
import { RequestFactory } from '@/shared/factories'
import { combine, createEvent, createStore, sample } from 'effector'
import { spread } from 'patronum'

const update = RequestFactory({
  name: 'UPDATE_CUSTOM_STRATEGY_STEP_RESULT',
  api: customStrategyStepResult.update,
})

const $show = createStore<boolean>(false)
const $stepResultId = createStore<number | null>(null)
const $stepResult = combine($$activeStrategy.$stepResults, $stepResultId, (statuses, id) =>
  statuses.find((status) => status.custom_strategy_step_result_id === id)
)

const $name = createStore<string>('')
const $description = createStore<string>('')
const $canSubmit = combine($name, $description, (name, description) => !!name && !!description)

const opened = createEvent<number>()
const closed = createEvent()

const nameChanged = createEvent<string>()
const descriptionChanged = createEvent<string>()

const submited = createEvent()

$show.on(opened, () => true)
$show.on(closed, () => false)
$show.on(update.done, () => false)

$stepResultId.on(opened, (_, id) => id)
$name.on(nameChanged, (_, value) => value)
$description.on(descriptionChanged, (_, value) => value)

sample({
  clock: $stepResult.updates,
  filter: (stepResult) => Boolean(stepResult),
  target: spread({
    targets: {
      result_name: nameChanged,
      result_description: descriptionChanged,
    },
  }),
})

sample({
  clock: submited,
  source: {
    stepResult: $stepResult,
    name: $name,
    description: $description,
  },
  filter: $canSubmit,
  fn: ({ stepResult, name, description }) => ({
    custom_strategy_step_id: stepResult.custom_strategy_step_id,
    custom_strategy_status_id: stepResult.custom_strategy_status_id,
    custom_strategy_step_result_id: stepResult.custom_strategy_step_result_id,
    result_name: name,
    result_description: description,
  }),
  target: update.submited,
})

sample({
  clock: update.done,
  source: $$activeStrategy.$strategy,
  fn: (strategy) => strategy.custom_strategy_id,
  target: $$activeStrategy.requestes.stepResults.submited,
})

sample({
  clock: update.done,
  fn: () => 'Изменения сохранены',
  target: $$alerts.showSuccess,
})

export const $$editStepResultModal = {
  ...update,
  $show,
  $name,
  $description,
  $canSubmit,

  opened,
  closed,

  nameChanged,
  descriptionChanged,

  submited,
}
