import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'

export const currentRoute = routes.account.profile

PageTitleFactory({
  title: 'Профиль',
  route: currentRoute,
})
