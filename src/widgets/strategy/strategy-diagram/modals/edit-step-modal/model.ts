import { customStrategyStep } from '@/shared/api'
import { $$activeStrategy, $$alerts } from '@/shared/effector'
import { RequestFactory } from '@/shared/factories'
import { combine, createEvent, createStore, sample } from 'effector'
import { spread } from 'patronum'

const update = RequestFactory({
  name: 'UPDATE_CUSTOM_STRATEGY_STEP',
  api: customStrategyStep.update,
})

const $show = createStore<boolean>(false)
const $stepId = createStore<number | null>(null)
const $step = combine($$activeStrategy.$steps, $stepId, (statuses, id) =>
  statuses.find((status) => status.custom_strategy_step_id === id)
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

$stepId.on(opened, (_, id) => id)
$name.on(nameChanged, (_, value) => value)
$description.on(descriptionChanged, (_, value) => value)

sample({
  clock: $step.updates,
  filter: (status) => Boolean(status),
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
    step: $step,
    name: $name,
    description: $description,
  },
  filter: $canSubmit,
  fn: ({ step, name, description }) => ({
    custom_strategy_step_id: step.custom_strategy_step_id,
    name,
    description,
    comment: step.comment,
  }),
  target: update.submited,
})

sample({
  clock: update.done,
  fn: (step) => step.custom_strategy_id,
  target: $$activeStrategy.requestes.steps.submited,
})

sample({
  clock: update.done,
  fn: () => 'Изменения сохранены',
  target: $$alerts.showSuccess,
})

export const $$editStepModal = {
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
