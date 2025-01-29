import { profile } from '@/shared/api'
import { $$alerts, $$session } from '@/shared/effector'
import { myMoment } from '@/shared/tools'
import { attach, createEvent, createStore, sample } from 'effector'
import { reset } from 'patronum'

const updateFx = attach({ effect: profile.update })

const $firstName = createStore('')
const $lastName = createStore('')
const $phone = createStore('')
const $birthday = createStore('')
const $city = createStore('')
const $email = createStore('')
const $password = createStore('')

const $pending = updateFx.pending

const $error = createStore<string | null>(null)

const firstNameChanged = createEvent<string>()
const lastNameChanged = createEvent<string>()
const phoneChanged = createEvent<string>()
const birthdayChanged = createEvent<string>()
const cityChanged = createEvent<string>()
const emailChanged = createEvent<string>()
const passwordChanged = createEvent<string>()

const reseted = createEvent()
const submited = createEvent()

$firstName.on(firstNameChanged, (_, value) => value)
$lastName.on(lastNameChanged, (_, value) => value)
$phone.on(phoneChanged, (_, value) => value)
$birthday.on(birthdayChanged, (_, value) => value)
$city.on(cityChanged, (_, value) => value)
$email.on(emailChanged, (_, value) => value)
$password.on(passwordChanged, (_, value) => value)

// Submited
sample({
  clock: submited,
  source: {
    first_name: $firstName,
    last_name: $lastName,
    phone: $phone,
    birthday: $birthday,
    city: $city,
    email: $email,
    password: $password,
  },
  target: updateFx,
})

// Done
sample({
  clock: updateFx.done,
  fn: () => 'Успешно сохранено!',
  target: $$alerts.showSuccess,
})

// Fail
sample({
  clock: updateFx.failData,
  target: $error,
})

// Reset
sample({
  clock: $$session.$profile.updates,
  target: reseted,
})

sample({
  clock: reseted,
  source: $$session.$profile,
  fn: (profile) => profile?.first_name || '',
  target: firstNameChanged,
})
sample({
  clock: reseted,
  source: $$session.$profile,
  fn: (profile) => profile?.last_name || '',
  target: lastNameChanged,
})
sample({
  clock: reseted,
  source: $$session.$profile,
  fn: (profile) => profile?.phone || '',
  target: phoneChanged,
})
sample({
  clock: reseted,
  source: $$session.$profile,
  fn: (profile) => myMoment(profile?.birthday || new Date()).format('YYYY-MM-DD'),
  target: birthdayChanged,
})
sample({
  clock: reseted,
  source: $$session.$profile,
  fn: (profile) => profile?.city || '',
  target: cityChanged,
})
sample({
  clock: reseted,
  source: $$session.$profile,
  fn: (profile) => profile?.email || '',
  target: emailChanged,
})

reset({
  clock: reseted,
  target: [$password],
})

reset({
  clock: [
    firstNameChanged,
    lastNameChanged,
    phoneChanged,
    birthdayChanged,
    cityChanged,
    emailChanged,
    passwordChanged,
  ],
  target: $error,
})

export const $$editProfileForm = {
  $firstName,
  $lastName,
  $phone,
  $birthday,
  $city,
  $email,
  $password,

  $pending,
  $error,

  firstNameChanged,
  lastNameChanged,
  phoneChanged,
  birthdayChanged,
  cityChanged,
  emailChanged,
  passwordChanged,

  reseted,
  submited,

  done: updateFx.done,
  fail: updateFx.fail,
}
