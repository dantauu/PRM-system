import { $$activeContact } from '@/entities/contact/model';
import { contact } from '@/shared/api'
import { $$alerts, $$contacts } from '@/shared/effector'
import { attach, createEvent, createStore, sample } from 'effector'
import { reset } from 'patronum'

const updateFx = attach({ effect: contact.updateAvatar })

const $avatar = createStore<FormData | null>(null)
const $contactId = createStore<number | null>(null)

const avatarChanged = createEvent<FormData>()
const contactIdChanged = createEvent<number>()

$avatar.on(avatarChanged, (_, avatar) => avatar)
$contactId.on(contactIdChanged, (_, contactId) => contactId)

const $pending = updateFx.pending
const $error = createStore<string | null>(null)

const submited = createEvent()
const reseted = createEvent()

// sample({
//   clock: contactIdChanged,
//   source: $$activeContact.$item,
//   fn: (contact) => ({ avatar: contact.avatar }),
//   target: $avatar
// })

// Submited
sample({
  clock: submited,
  source: {
    avatar: $avatar,
    contact_id: $contactId,
  },
  filter: ({ avatar }) => !!avatar,
  fn: (contact) => ({ avatar: contact.avatar, contact_id: contact.contact_id }),
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

export const $$contactAvatar = {
  $avatar,
  avatarChanged,

  $contactId,
  contactIdChanged,

  $error,
  $pending,

  submited,
  reseted,
}
