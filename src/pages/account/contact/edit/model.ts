import { $$contactEditPage } from '@/shared/effector'
import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'
import { sample } from 'effector'

export const currentRoute = routes.account.contact.edit

PageTitleFactory({
  title: 'Редактирование контакта',
  route: currentRoute,
})

sample({
  clock: currentRoute.opened,
  fn: ({ params }) => params.contactId,
  target: $$contactEditPage.submited,
})

sample({
  clock: currentRoute.closed,
  target: $$contactEditPage.reseted,
})
