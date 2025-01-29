import { $$contactEditPage } from './contact-edit-page'
import { ContactWithInfo, UpdateContactData, contact } from '@/shared/api'
import { $$alerts } from '@/shared/effector'
import { myMoment } from '@/shared/tools'
import { attach, createEvent, createStore, sample } from 'effector'
import { reset, spread } from 'patronum'

const updateFx = attach({ effect: contact.update })

const $contactId = createStore<number | null>(null)
const $firstName = createStore('')
const $lastName = createStore('')
const $phone = createStore('')
const $telegramId = createStore('')
const $profession = createStore('')
const $birthDate = createStore('')
const $comment = createStore('')
const $country = createStore('')
const $city = createStore('')

const $pending = updateFx.pending
const $error = createStore<string | null>(null)

const firstNameChanged = createEvent<string>()
const lastNameChanged = createEvent<string>()
const phoneChanged = createEvent<string>()
const telegramIdChanged = createEvent<string>()
const professionChanged = createEvent<string>()
const birthDateChanged = createEvent<string>()
const commentChanged = createEvent<string>()
const countryChanged = createEvent<string>()
const cityChanged = createEvent<string>()

const inited = createEvent<ContactWithInfo>()
const submited = createEvent()
const reseted = createEvent()

$lastName.on(lastNameChanged, (_, value) => value)
$firstName.on(firstNameChanged, (_, value) => value)
$phone.on(phoneChanged, (_, value) => value)
$telegramId.on(telegramIdChanged, (_, value) => value)
$profession.on(professionChanged, (_, value) => value)
$birthDate.on(birthDateChanged, (_, value) =>
  value ? myMoment(value).format('YYYY-MM-DD') : myMoment().format('YYYY-MM-DD')
)
$comment.on(commentChanged, (_, value) => value)
$country.on(countryChanged, (_, value) => value)
$city.on(cityChanged, (_, value) => value)

// Inited
sample({
  clock: $$contactEditPage.$contact.updates,
  filter: (contact) => !!contact,
  fn: (contact) => contact as ContactWithInfo,
  target: inited,
})

sample({
  clock: inited,
  target: spread({
    id: $contactId,
    surname: $lastName,
    name: $firstName,
    telephone: $phone,
    telegram: $telegramId,
    profession: $profession,
    birthDate: birthDateChanged,
    note: $comment,
    country: $country,
    city: $city,
  }),
})

// Submited
sample({
  clock: submited,
  source: {
    contact_id: $contactId,
    last_name: $lastName,
    first_name: $firstName,
    phone: $phone,
    telegram_ID: $telegramId,
    profession: $profession,
    birth_date: $birthDate,
    comment: $comment,
    country: $country,
    city: $city,
  },
  filter: ({ contact_id }) => !!contact_id,
  fn: (contact) => contact as UpdateContactData,
  target: updateFx,
})

// Done
sample({
  clock: updateFx.done,
  fn: () => 'Успешно сохранено',
  target: $$alerts.showSuccess,
})

sample({
  clock: updateFx.done,
  target: $$contactEditPage.reload,
})

// Reseted
reset({
  clock: reseted,
  target: [
    $contactId,
    $lastName,
    $firstName,
    $phone,
    $telegramId,
    $profession,
    $birthDate,
    $comment,
    $country,
    $city,
  ],
})

reset({
  clock: [
    lastNameChanged,
    firstNameChanged,
    phoneChanged,
    telegramIdChanged,
    professionChanged,
    birthDateChanged,
    commentChanged,
    countryChanged,
    cityChanged,
  ],
  target: $error,
})

export const $$contactEditForm = {
  $contactId,
  $lastName,
  $firstName,
  $phone,
  $telegramId,
  $profession,
  $birthDate,
  $comment,
  $country,
  $city,

  $error,
  $pending,

  lastNameChanged,
  firstNameChanged,
  phoneChanged,
  telegramIdChanged,
  professionChanged,
  birthDateChanged,
  commentChanged,
  countryChanged,
  cityChanged,

  submited,
  reseted,
}
