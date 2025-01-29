import { customStrategyStatus } from '@/shared/api'
import { $$activeStrategy, $$alerts } from '@/shared/effector'
import { RequestFactory } from '@/shared/factories'
import { combine, createEvent, createStore, sample } from 'effector'
import { spread } from 'patronum'

const update = RequestFactory({
  name: 'UPDATE_CUSTOM_STRATEGY_STATUS',
  api: customStrategyStatus.update,
})

const $show = createStore<boolean>(false)
const $statusId = createStore<number | null>(null)
const $status = combine($$activeStrategy.$statuses, $statusId, (statuses, id) =>
  statuses.find((status) => status.custom_strategy_status_id === id)
)

const $name = createStore<string>('')
const $description = createStore<string>('')
const $color = createStore<number | null>(null)
const $canSubmit = combine(
  $name,
  $description,
  $color,
  (name, description, color) => !!name && !!description && !!color
)

const opened = createEvent<number>()
const closed = createEvent()

const nameChanged = createEvent<string>()
const descriptionChanged = createEvent<string>()
const colorChanged = createEvent<number>()

const submited = createEvent()

$show.on(opened, () => true)
$show.on(closed, () => false)
$show.on(update.done, () => false)

$statusId.on(opened, (_, id) => id)
$name.on(nameChanged, (_, value) => value)
$description.on(descriptionChanged, (_, value) => value)
$color.on(colorChanged, (_, value) => value)

sample({
  clock: $status.updates,
  filter: (status) => Boolean(status),
  target: spread({
    targets: {
      name: nameChanged,
      description: descriptionChanged,
      global_strategy_status_color_id: colorChanged,
    },
  }),
})

sample({
  clock: submited,
  source: {
    status: $status,
    name: $name,
    description: $description,
    color: $color,
  },
  filter: $canSubmit,
  fn: ({ status, name, description, color }) => ({
    custom_strategy_status_id: status.custom_strategy_status_id,
    name,
    description,
    global_strategy_status_color_id: color,
    activity_flag: status.activity_flag,
    custom_strategy_next_step_id: status.custom_strategy_next_step_id,
    custom_strategy_head_status_id: status.custom_strategy_head_status_id
  }),
  target: update.submited,
})

sample({
  clock: update.done,
  fn: (status) => status.custom_strategy_id,
  target: $$activeStrategy.requestes.statuses.submited,
})

sample({
  clock: update.done,
  fn: () => 'Изменения сохранены',
  target: $$alerts.showSuccess,
})

export const $$editStatusModal = {
  ...update,
  $show,
  $name,
  $description,
  $color,
  $canSubmit,

  opened,
  closed,

  nameChanged,
  descriptionChanged,
  colorChanged,

  submited,
}
