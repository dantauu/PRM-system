import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'

export const currentRoute = routes.account.finance

PageTitleFactory({
  title: 'Финансы',
  route: currentRoute,
})
