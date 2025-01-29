import { auth } from '@/shared/api'
import { $$alerts } from '@/shared/effector'
import { routes } from '@/shared/router'
import { redirect } from 'atomic-router'
import { attach, createEffect, createEvent, createStore, sample } from 'effector'
import { delay, reset } from 'patronum'

const loginFx = attach({ effect: auth.login })

const $email = createStore('')
const $password = createStore('')
const $pending = loginFx.pending
const $error = createStore<string | null>('')

const emailChanged = createEvent<string>()
const passwordChanged = createEvent<string>()

const submited = createEvent()
const reseted = createEvent()

const loginedFx = createEffect(() => {
  localStorage.setItem('is-auth', 'true')
})

$email.on(emailChanged, (_, value) => value)
$password.on(passwordChanged, (_, value) => value)

// Submited
sample({
  clock: submited,
  source: { email: $email, password: $password },
  target: loginFx,
})

// Done
const delayedDone = delay({
  source: loginedFx.done,
  timeout: 300,
})

sample({
  clock: loginFx.done,
  target: loginedFx,
})

redirect({
  clock: delayedDone,
  route: routes.account.main,
})

// Fail
sample({
  clock: loginFx.failData,
  target: [$error, $$alerts.showDanger],
})

sample({
  clock: [emailChanged, passwordChanged],
  source: $error,
  filter: (error) => !!error,
  fn: () => null as null,
  target: $error,
})

reset({ clock: reseted, target: [$email, $password, $error] })

export const $$loginForm = {
  $email,
  $password,
  $pending,
  $error,

  emailChanged,
  passwordChanged,

  reseted,
  submited,

  done: loginFx.done,
  fail: loginFx.fail,
}
