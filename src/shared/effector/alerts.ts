import { Effect, attach, createEffect, createEvent, createStore, sample } from 'effector'
import { delay, spread } from 'patronum'

export type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger'

export interface Alert {
  id: number
  message: string
  variant: AlertVariant
}

type ToShowAlert = Omit<Alert, 'id'>

interface PushAlert {
  increment: number
  alerts: Alert[]
  alert: ToShowAlert
}

interface RemoveAlert {
  id: number
  alerts: Alert[]
}

const TIME_FOR_SHOWING_ALERT = 5000

// Stores

const $autoIncrement = createStore(1)
const $items = createStore<Alert[]>([])

// Events

const increment = createEvent()

const show = createEvent<ToShowAlert>()

const hide = createEvent<number>()
const delayedHide = delay(hide, TIME_FOR_SHOWING_ALERT)
const hidden = createEvent<number>()

// Effects

const pushAlertFx = createEffect(({ increment, alerts, alert }: PushAlert) => ({
  id: increment,
  alerts: [...alerts, { id: increment, ...alert }],
}))

const pushFx = attach({
  source: { increment: $autoIncrement, alerts: $items },
  mapParams: (alert: ToShowAlert, { increment, alerts }) => ({
    increment,
    alerts,
    alert,
  }),
  effect: pushAlertFx,
})

const hideAlertFx = createEffect(({ id: toRemoveId, alerts: alerts }: RemoveAlert) => {
  const index = alerts.findIndex(({ id }) => id === toRemoveId)

  if (index === -1) {
    return alerts
  }

  const cloned = [...alerts]
  cloned.splice(index, 1)
  return cloned
})

const hideFx = attach({
  source: { alerts: $items },
  mapParams: (id: number, { alerts }) => ({
    id,
    alerts: alerts,
  }),
  effect: hideAlertFx,
})

// Events by Factory
const showPrimary = ShowFactory('primary', pushFx)
const showSecondary = ShowFactory('secondary', pushFx)
const showSuccess = ShowFactory('success', pushFx)
const showDanger = ShowFactory('danger', pushFx)
// Logic

$autoIncrement.on(increment, (value) => value + 1)

// Show
sample({
  clock: show,
  target: pushFx,
})

sample({
  clock: pushFx.doneData,
  target: spread({
    id: hide,
    alerts: $items,
  }),
})

sample({
  clock: pushFx.done,
  target: increment,
})

// Remove
sample({
  clock: [hidden, delayedHide],
  target: hideFx,
})

sample({
  clock: hideFx.doneData,
  target: $items,
})

export const $$alerts = {
  $autoIncrement,
  $items,

  show,
  showPrimary,
  showSecondary,
  showSuccess,
  showDanger,

  hidden,
}

// Factories

function ShowFactory(
  variant: AlertVariant,
  pushFx: Effect<ToShowAlert, { id: number; alerts: Alert[] }>
) {
  const show = createEvent<string>()

  sample({
    clock: show,
    fn: (message) => ({ message, variant }),
    target: pushFx,
  })

  return show
}
