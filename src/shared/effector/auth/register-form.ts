import { auth } from '@/shared/api'
import { $$alerts, $$session } from '@/shared/effector'
import { routes } from '@/shared/router'
import { redirect } from 'atomic-router'
import { attach, combine, createEvent, createStore, sample } from 'effector'
import { reset } from 'patronum'

const registerFx = attach({ effect: auth.register })

const $firstName = createStore('')
const $lastName = createStore('')
const $login = createStore('')
const $email = createStore('')
const $phone = createStore('')
const $password = createStore('')
const $confirmPassword = createStore('')
const $parentLogin = createStore('PRM4ALL')
const $termsReaded = createStore(true)

const $pending = registerFx.pending
const $error = createStore<string | null>('')

const $canSubmit = combine(
  $firstName,
  $lastName,
  $login,
  $email,
  $phone,
  $password,
  $confirmPassword,
  $parentLogin,
  $termsReaded,
  $error,
  (
    firstName,
    lastName,
    login,
    email,
    phone,
    password,
    confirmPassword,
    parentLogin,
    termsReaded,
    error
  ) => {
    const validators = [
      firstName.trim() !== '',
      lastName.trim() !== '',
      login.trim() !== '',
      email.trim() !== '',
      phone.trim() !== '',
      password.trim() !== '',
      confirmPassword.trim() !== '',
      password.trim() === confirmPassword.trim(),
      parentLogin.trim() !== '',
      termsReaded,
      !error,
    ]

    return validators.every((validator) => validator)
  }
)

const firstNameChanged = createEvent<string>()
const lastNameChanged = createEvent<string>()
const loginChanged = createEvent<string>()
const emailChanged = createEvent<string>()
const phoneChanged = createEvent<string>()
const passwordChanged = createEvent<string>()
const confirmPasswordChanged = createEvent<string>()
const parentLoginChanged = createEvent<string>()
const termsReadedChanged = createEvent<boolean>()

const opened = createEvent()
const submited = createEvent()
const reseted = createEvent()

$firstName.on(firstNameChanged, (_, value) => value)
$lastName.on(lastNameChanged, (_, value) => value)
$login.on(loginChanged, (_, value) => value)
$email.on(emailChanged, (_, value) => value)
$phone.on(phoneChanged, (_, value) => value)
$password.on(passwordChanged, (_, value) => value)
$confirmPassword.on(confirmPasswordChanged, (_, value) => value)
$parentLogin.on(parentLoginChanged, (_, value) => value)
$termsReaded.on(termsReadedChanged, (_, value) => value)

// Opened
sample({
  clock: opened,
  source: $$session.$refLogin,
  target: parentLoginChanged,
})

// Submited
sample({
  clock: submited,
  source: {
    firstName: $firstName,
    lastName: $lastName,
    login: $login,
    email: $email,
    phone: $phone,
    password: $password,
    confirmPassword: $confirmPassword,
    parentLogin: $parentLogin,
  },
  target: registerFx,
})

// Done
redirect({
  clock: registerFx.done,
  route: routes.auth.login,
})

// Fali
sample({
  clock: registerFx.failData,
  target: [$error, $$alerts.showDanger],
})

// Reseted
sample({
  clock: [
    firstNameChanged,
    lastNameChanged,
    loginChanged,
    emailChanged,
    phoneChanged,
    passwordChanged,
    confirmPasswordChanged,
    parentLoginChanged,
  ],
  source: $error,
  filter: (error) => !!error,
  fn: () => null as null,
  target: $error,
})

reset({
  clock: reseted,
  target: [
    $firstName,
    $lastName,
    $login,
    $email,
    $phone,
    $password,
    $confirmPassword,
    $parentLogin,
    $error,
  ],
})

export const $$registerForm = {
  $firstName,
  $lastName,
  $login,
  $email,
  $phone,
  $password,
  $confirmPassword,
  $parentLogin,
  $termsReaded,

  $pending,
  $error,
  $canSubmit,

  firstNameChanged,
  lastNameChanged,
  loginChanged,
  emailChanged,
  phoneChanged,
  passwordChanged,
  confirmPasswordChanged,
  parentLoginChanged,
  termsReadedChanged,

  opened,
  reseted,
  submited,

  done: registerFx.done,
  fail: registerFx.fail,
}
