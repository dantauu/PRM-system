import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'

export const currentRoute = routes.account.marketplace

PageTitleFactory({
  title: 'Маркетплейс',
  route: currentRoute,
})
