import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'

export const currentRoute = routes.account.communication

PageTitleFactory({
  title: 'Коммуникации',
  route: currentRoute,
})
