import { LandingRef, landing } from '@/shared/api'
import { attach, createEvent, createStore, sample } from 'effector'
import { reset } from 'patronum'

const getByLoginFx = attach({ effect: landing.getByLogin })

const $landing = createStore<LandingRef | null>(null)

const $pending = getByLoginFx.pending

const submited = createEvent<string>()
const reseted = createEvent()

// Submited
sample({
  clock: submited,
  fn: (login) => ({ login }),
  target: getByLoginFx,
})

// Done
sample({
  clock: getByLoginFx.doneData,
  target: $landing,
})

// Resetes
reset({
  clock: reseted,
  target: [$landing],
})

export const $$landingRefPage = {
  $landing,

  $pending,

  submited,
  reseted,
}
