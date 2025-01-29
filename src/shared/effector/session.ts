import { routes } from '../router'
import { $$loginForm } from './auth/login-form'
import { Profile, profile } from '@/shared/api'
import { $$app } from '@/shared/effector/app'
import { redirect } from 'atomic-router'
import { attach, createEffect, createEvent, createStore, sample } from 'effector'
import { $$lotteryTickets } from './lottery-tickets/lottery-tickets'

const getFx = attach({ effect: profile.get })
const getLoginFx = attach({ effect: profile.getLogin })

export enum Auth {
  Unknown,
  Anonymous,
  Authorized,
}

const $auth = createStore<Auth>(Auth.Unknown)
const $login = createStore<string | null>(null)
const $profile = createStore<Profile | null>(null)
const $refLogin = createStore<string>('PRM4ALL')

const refLoginChanged = createEvent<string>()
const authed = createEvent()

const logout = createEvent()
const logouted = createEvent()

const checkLocalStorageFx = createEffect(() => {
  const isAuthText = localStorage.getItem('is-auth') ?? 'false'
  return isAuthText === 'true' ? true : false
})

const logoutFx = createEffect(() => {
  localStorage.setItem('is-auth', 'false')
})

$refLogin.on(refLoginChanged, (_, value) => value)

const reload = createEvent()

sample({
  clock: [reload],
  target: getFx,
})

// Started
sample({
  clock: $$app.started,
  target: checkLocalStorageFx,
})

// Checked
sample({
  clock: checkLocalStorageFx.doneData,
  filter: (isAuth) => isAuth,
  target: getFx,
})

sample({
  clock: checkLocalStorageFx.doneData,
  filter: (isAuth) => isAuth,
  target: getLoginFx,
})

sample({
  clock: checkLocalStorageFx.doneData,
  filter: (isAuth) => !isAuth,
  fn: () => Auth.Anonymous,
  target: $auth,
})

// Logined
sample({
  clock: $$loginForm.done,
  fn: () => Auth.Unknown,
  target: $auth,
})

sample({
  clock: $$loginForm.done,
  target: getFx,
})

sample({
  clock: $$loginForm.done,
  target: getLoginFx,
})

// Done
sample({
  clock: getFx.done,
  fn: () => Auth.Authorized,
  target: $auth,
})
sample({
  clock: getFx.done,
  target: authed,
})

sample({
  clock: getFx.doneData,
  target: $profile,
})

sample({
  clock: getLoginFx.doneData,
  fn: (response) => response.login,
  target: $login,
})

sample({
  clock: getFx.done,
  target: $$lotteryTickets.getTicketsFx
})

// Fail
sample({
  clock: getFx.fail,
  fn: () => Auth.Anonymous,
  target: $auth,
})

sample({
  clock: logout,
  target: logoutFx,
})

// Logout
sample({
  clock: logout,
  fn: () => Auth.Anonymous,
  target: $auth,
})

sample({
  clock: logout,
  target: logoutFx,
})

redirect({
  clock: logoutFx.done,
  route: routes.account.main,
})

$login.on(logout, () => null)
$profile.on(logout, () => null)

export const $$session = {
  $auth,
  $login,
  $profile,
  $refLogin,

  refLoginChanged,

  authed,

  logout,
  logouted,

  reload,
}
