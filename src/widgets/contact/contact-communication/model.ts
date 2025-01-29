import { $$activeContact } from '@/entities/contact/model'
import { communication } from '@/shared/api'
import { getStepResultsFx } from '@/shared/api/strategy/custom-strategy/strategy-step-result/get-results-step'
import { $$activeStrategy } from '@/shared/effector'
import { $$alerts, $$lastContact } from '@/shared/effector'
import { $$contactCustomStrategyStatuses } from '@/shared/effector/contact'
import { RequestFactory } from '@/shared/factories'
import { attach, combine, createEvent, createStore, restore, sample } from 'effector'
import { every, reset } from 'patronum'

const getStepResults = attach({ effect: getStepResultsFx })
const $resultsStep = restore(getStepResults, [])

//* Info For Form
const $contact = $$activeContact.$item

const $contactCustomStrategyStatus = combine(
  $$contactCustomStrategyStatuses.$items,
  $contact,
  (items, contact) => {
    console.log('1dasdadad', contact)
    return contact ? items.find((item) => item.contact_id.contact_id === contact?.contact_id) : null
  },
  { skipVoid: false }
)

const $nextStep = combine(
  $$activeStrategy.$steps,
  $contactCustomStrategyStatus,
  (steps, status) => {
    return status
      ? steps.find(
          (step) =>
            step.custom_strategy_step_id ===
            status.custom_strategy_status_id.custom_strategy_next_step_id
        )
      : null
  }
)

// const $nextStep = combine($$activeStrategy.$steps, $contactCustomStrategyStatus, (steps, status) => {
//   console.log("status в model", status)
//   return status
//     ? steps.find(
//         (step) =>
//           step.custom_strategy_step_id ===
//           status.custom_strategy_status_id.custom_strategy_next_step_id
//       )
//     : null
//   })

const $nextStepResults = combine($$activeStrategy.$stepResults, $nextStep, (stepResults, step) =>
  step
    ? stepResults.filter(
        (stepResult) => stepResult.custom_strategy_step_id === step.custom_strategy_step_id
      )
    : []
)

// sample({
//   clock: $nextStep.updates,
//   filter: (nextStep) => Boolean(nextStep),
//   fn: (data) => data.custom_strategy_step_id,
//   target: getStepResults
// })

const $infoPending = every({
  stores: [
    $$activeContact.$status,
    $$activeStrategy.$stepsStatus,
    $$activeStrategy.$stepResultsStatus,
  ],
  predicate: (status) => status === 'pending',
})

//* Form
const $stepResultId = createStore<number | null>(null)
const $communicationTypeId = createStore<number | null>(null)
const $comment = createStore<string>('')

const $formCanSubmit = combine(
  // $stepResultId,
  $communicationTypeId,
  $comment,
  // (stepResultId, communicationTypeId, comment) =>
  (communicationTypeId, comment) =>
    // !!stepResultId && !!communicationTypeId && !!comment
    !!communicationTypeId && !!comment
)

const stepResultIdChanged = createEvent<number>()
const communicationTypeIdChanged = createEvent<number>()
const commentChanged = createEvent<string>()

const formReseted = createEvent()

$stepResultId.on(stepResultIdChanged, (_, value) => value)
$communicationTypeId.on(communicationTypeIdChanged, (_, value) => value)
$comment.on(commentChanged, (_, value) => value)

reset({
  clock: formReseted,
  target: [$stepResultId, $communicationTypeId, $comment],
})

//* Create Communication
const createCommunication = RequestFactory({
  name: 'CREATE_COMMUNICATION',
  api: communication.create,
})

const submited = createEvent()

sample({
  clock: submited,
  source: {
    contact: $contact,
    step: $nextStep,
    stepResultId: $stepResultId,
    communicationTypeId: $communicationTypeId,
    comment: $comment,
    infoPending: $infoPending,
    formCanSubmit: $formCanSubmit,
  },
  filter: ({ infoPending, formCanSubmit }) => !infoPending && formCanSubmit,
  fn: ({ contact, step, stepResultId, communicationTypeId, comment }) => ({
    contact_id: contact.contact_id,
    custom_strategy_step_id: step.custom_strategy_step_id,
    // custom_strategy_step_id: 44,
    custom_strategy_step_result_id: stepResultId,
    communication_type_id: communicationTypeId,
    comment,
    date: new Date().toISOString(),
  }),
  target: createCommunication.submited,
})

sample({
  clock: createCommunication.done,
  source: $contact,
  fn: (contact) => contact.contact_id,
  target: $$contactCustomStrategyStatuses.oneUpdated,
})

sample({
  clock: createCommunication.done,
  target: $$lastContact.submited,
})

sample({
  clock: createCommunication.done,
  fn: () => 'Информация сохранена!',
  target: $$alerts.showSuccess,
})

export const $$contactCommunication = {
  // Info
  info: {
    $contact,
    $contactCustomStrategyStatus,
    $nextStep,
    $nextStepResults,
    $infoPending,
  },

  // Form
  form: {
    $stepResultId,
    $communicationTypeId,
    $comment,
    $canSubmit: $formCanSubmit,

    stepResultIdChanged,
    communicationTypeIdChanged,
    commentChanged,

    reseted: formReseted,
  },

  // Create Communication
  ...createCommunication,
  submited,

  $resultsStep,
}
