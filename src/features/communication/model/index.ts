import { $$dCustomStrategy } from '@/entities/strategy'
import { ContactWithInfo } from '@/shared/api'
import { DCustomStrategyStep } from '@/shared/domain'
import { $$alerts, $$communicationType } from '@/shared/effector'
import { $$communication } from '@/shared/effector/communication'
import { myMoment } from '@/shared/tools'
import { combine, createEvent, createStore, sample } from 'effector'
import { debug, reset, spread } from 'patronum'

const create = $$communication.create

interface Inited {
  contact: ContactWithInfo
  step: DCustomStrategyStep
}

//* Stores
const $contact = createStore<ContactWithInfo | null>(null)
const $step = createStore<DCustomStrategyStep | null>(null)
const $resultId = createStore<number | null>(null)
const $communicationTypeId = createStore<number | null>(null)
const $comment = createStore<string>('')

const $result = combine(
  $step,
  $resultId,
  (step, id) => step?.results.find((result) => result.custom_strategy_step_result_id === id) || null
)
const $communicationType = combine(
  $$communicationType.getAll.$items,
  $communicationTypeId,
  (communicationTypes, id) =>
    communicationTypes.find(
      (communicationType) => communicationType.communication_type_id === id
    ) || null
)

const $canSubmit = combine(
  $contact,
  $result,
  $communicationType,
  (contact, result, communication_type) => !!contact && !!result && !!communication_type
)

debug($contact, $resultId, $result, $communicationTypeId, $communicationType)

//* Events
const contactChanged = createEvent<ContactWithInfo>()
const stepChanged = createEvent<DCustomStrategyStep>()
const resultIdChanged = createEvent<number>()
const communicationTypeIdChanged = createEvent<number>()
const commentChanged = createEvent<string>()

const inited = createEvent<Inited>()
const submit = createEvent()

//* Logic
$contact.on(contactChanged, (_, value) => value)
$step.on(stepChanged, (_, value) => value)
$resultId.on(resultIdChanged, (_, value) => value)
$communicationTypeId.on(communicationTypeIdChanged, (_, value) => value)
$comment.on(commentChanged, (_, value) => value)

// Reset
reset({
  clock: [inited, create.reseted],
  target: [$contact, $step, $resultId, $communicationTypeId, $comment],
})

// Inited
sample({
  clock: inited,
  target: spread({
    targets: {
      contact: contactChanged,
      step: stepChanged,
    },
  }),
})

// Submit
sample({
  clock: submit,
  source: {
    contact: $contact,
    result: $result,
    communication_type: $communicationType,
    comment: $comment,
  },
  filter: $canSubmit,
  fn: ({ contact, result, communication_type, comment }) => ({
    custom_strategy_step_id: result.custom_strategy_step_id,
    custom_strategy_step_result_id: result.custom_strategy_step_result_id,
    contact_id: contact.contact_id,
    communication_type_id: communication_type.communication_type_id,

    comment,
    date: myMoment().format(myMoment.defaultApiFormat),
  }),
  target: create.submited,
})

// Done
sample({
  clock: create.done,
  source: $step,
  fn: ({ custom_strategy_id }) => ({ strategy_id: custom_strategy_id }),
  target: $$dCustomStrategy.getAll.getContacts.submited,
})

sample({
  clock: create.done,
  fn: () => 'Информация сохранена',
  target: $$alerts.showSuccess,
})

export const $$createCommunication = {
  ...create,

  $contact,
  $step,
  $resultId,
  $communicationTypeId,
  $comment,

  $result,
  $communicationType,

  $canSubmit,

  contactChanged,
  stepChanged,
  resultIdChanged,
  communicationTypeIdChanged,
  commentChanged,

  inited,
  submit,
}
