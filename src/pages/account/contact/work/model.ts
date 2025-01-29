import { $$activeContact } from '@/entities/contact/model'
import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'
import { $$contactCommunication } from '@/widgets/contact/contact-communication/model'
import { $$activeContactCommunications } from '@/widgets/contact/contact-work-history-table/model'
import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'
import { condition } from 'patronum'

export const currentRoute = routes.account.contact.work

PageTitleFactory({
  title: 'Работа с контактом',
  route: currentRoute,
})

//* Stores
const $isValidRoute = currentRoute.$params.map((params) => Boolean(params.id))

//* Events
const redirected = createEvent()

//* Logic
// Redirected
redirect({
  clock: redirected,
  route: routes.account.main,
})
// Opened
sample({
  clock: [currentRoute.opened],
  source: { pageParams: currentRoute.$params, contactParams: $$activeContact.$params },
  filter: ({ pageParams, contactParams }) =>
    Boolean(pageParams?.id) && Boolean(contactParams?.id) && pageParams.id !== contactParams.id,
  target: $$activeContact.reseted,
})

sample({
  clock: [currentRoute.opened],
  source: $$activeContactCommunications.$params,
  filter: (contactParams, pageParams) =>
    Boolean(pageParams.params.id) &&
    Boolean(contactParams?.contact_id) &&
    pageParams.params.id !== contactParams.contact_id,
  target: $$activeContactCommunications.reseted,
})

condition({
  source: currentRoute.$params,
  if: $isValidRoute,
  then: $$activeContact.submited,
  else: redirected,
})

// Load Fail
sample({
  clock: $$activeContact.fail,
  target: redirected,
})

// Create Communication Done
sample({
  clock: $$contactCommunication.done,
  target: $$activeContact.reloaded,
})

// Closed
sample({
  clock: currentRoute.closed,
  target: $$activeContact.reseted,
})

//* Загрузить контакта
//* Есть контакт?
//* - Нет
//* Редирект
//* - Да
//* Отправка в модели
//* Коммуникация создана?
//* - Перезагрузить контакт
