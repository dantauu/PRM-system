import { profile } from '@/shared/api'
import { $$alerts, $$contacts, $$session } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'
import { reset } from 'patronum'

const updateFx = attach({ effect: profile.updateAvatar })

const $avatar = createStore<FormData | null>(null)

const avatarChanged = createEvent<FormData>()

$avatar.on(avatarChanged, (_, avatar) => avatar)

const $pending = updateFx.pending
const $error = createStore<string | null>(null)

const submited = createEvent()
const reseted = createEvent()

// Submited
sample({
  clock: submited,
  source: {
    avatar: $avatar,
  },
  filter: ({ avatar }) => !!avatar,
  fn: (contact) => ({ avatar: contact.avatar }),
  target: updateFx,
})

// Done
sample({
  clock: updateFx.done,
  fn: () => 'Аватар изменен',
  target: $$alerts.showSuccess,
})

sample({
  clock: updateFx.done,
  target: $$contacts.reload,
})

sample({
  clock: updateFx.done,
  target: $$session.reload,
})

// Failed
sample({
  clock: updateFx.fail,
  fn: () => 'Аватар не изменен',
  target: $$alerts.showDanger,
})

// Reseted
reset({
  clock: reseted,
  target: [$avatar],
})

reset({
  clock: [],
  target: $error,
})

export const $$profileAvatar = {
  $avatar,
  avatarChanged,

  $error,
  $pending,

  submited,
  reseted,
}
