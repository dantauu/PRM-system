import { CustomStrategyStatus, customStrategyStatus } from '@/shared/api'
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
  statuses.find((status) => status.custom_strategy_status_id === id) || $$activeStrategy.$statuses.getState()[0]
)

const $name = createStore<string>($$activeStrategy.$statuses.getState()[0]?.name || '')
const $color = createStore<number | null>($$activeStrategy.$statuses.getState()[0]?.global_strategy_status_color_id || null)
const $canSubmit = combine(
    $name,
    $color,
    (name, color) => !!name && !!color
)

const statusChanged = createEvent<number>()

const nameChanged = createEvent<string>()
const colorChanged = createEvent<number>()

const submited = createEvent()

$statusId.on(statusChanged, (_, id) => id)
$name.on(nameChanged, (_, value) => value)
$color.on(colorChanged, (_, value) => value)

const setInitName = createEvent()
const setInitColor = createEvent()

sample({
    clock: setInitName,
    source: $status,
    fn: (status) => status.name,
    target: $name
})

sample({
    clock: setInitColor,
    source: $status,
    fn: (status) => status.global_strategy_status_color_id,
    target: $color
})

sample({
    clock: $status.updates,
    filter: (status) => Boolean(status),
    target: spread({
        targets: {
            name: nameChanged,
            global_strategy_status_color_id: colorChanged,
        },
    }),
})

sample({
    clock: submited,
    source: {
        status: $status,
        name: $name,
        color: $color,
    },
    filter: $canSubmit,
    fn: ({ status, name, color }) => ({
        custom_strategy_status_id: status.custom_strategy_status_id,
        name,
        description: status.description,
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

// sample({
//     clock: update.fail,
//     fn: () => 'Изменения не сохранены',
//     target: $$alerts.showDanger,
// })

export const $$editStatus = {
    ...update,
    $show,
    $name,
    $color,
    $canSubmit,

    $statusId,
    statusChanged,

    nameChanged,
    colorChanged,

    submited,

    setInitName,
    setInitColor
}
