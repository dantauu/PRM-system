import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'

export const currentRoute = routes.account.team

PageTitleFactory({
  title: 'Команда',
  route: currentRoute,
})
