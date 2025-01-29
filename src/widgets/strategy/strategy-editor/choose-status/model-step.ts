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
  statuses.find((status) => status.custom_strategy_step_id === id) || $$activeStrategy.$steps.getState()[0]
)

const firstLoadingStatus = $$activeStrategy.$statuses.getState()[0]
const firtsLoadingScript = $$activeStrategy.$steps.getState().find(step => step.custom_strategy_step_id === firstLoadingStatus?.custom_strategy_next_step_id)?.comment

// const $description = createStore<string>($$activeStrategy.$steps.getState()[0]?.description || '')
//$$activeStrategy.$steps.getState()[0]?.comment || 
const $description = createStore<string>(firtsLoadingScript || '')
const $canSubmit = combine($description, (description) => !!description)

const stepChanged = createEvent<number>()
const closed = createEvent()

const nameChanged = createEvent<string>()
const descriptionChanged = createEvent<string>()

const submited = createEvent()

const setInitDesc = createEvent()

sample({
    clock: setInitDesc,
    source: $step,
    // fn: (step) => step.description,
    fn: (step) => step.comment,
    target: $description
})

$stepId.on(stepChanged, (_, id) => id)
$description.on(descriptionChanged, (_, value) => value)

sample({
  clock: $step.updates,
  filter: (status) => Boolean(status),
  target: spread({
    targets: {
      name: nameChanged,
      // description: descriptionChanged,
    },
  }),
})

sample({
  clock: $step.updates,
  fn: (step) => step.comment,
  target: $description,
})

sample({
  clock: submited,
  source: {
    step: $step,
    description: $description,
  },
  filter: $canSubmit,
  fn: ({ step, description }) => ({
    custom_strategy_step_id: step.custom_strategy_step_id,
    name: step.name,
    // description,
    // comment: step.comment,
    description: step.description,
    comment: description,
  }),
  target: update.submited,
})

sample({
  clock: update.done,
  fn: (step) => step.custom_strategy_id,
  target: $$activeStrategy.requestes.steps.submited,
})

// sample({
//   clock: update.done,
//   fn: () => 'Изменения сохранены',
//   target: $$alerts.showSuccess,
// })

export const $$editStep = {
  ...update,
  $show,
  $description,
  $canSubmit,

  closed,

  stepChanged,

  descriptionChanged,

  submited,

  setInitDesc
}
