import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'

export const currentRoute = routes.account.main

PageTitleFactory({
  title: 'Главная',
  route: currentRoute,
})
