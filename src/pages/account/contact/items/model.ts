import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'

export const currentRoute = routes.account.contact.items

PageTitleFactory({
  title: 'Контакты',
  route: currentRoute,
})
