import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'

export const currentRoute = routes.account.strategy.items

PageTitleFactory({
  title: 'Доступные стратегии',
  route: currentRoute,
})
