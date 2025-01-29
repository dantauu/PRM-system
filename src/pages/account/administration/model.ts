import { chainAdmin } from '@/shared/effector/administration/admin-status'
import { PageTitleFactory } from '@/shared/factories'
import { routes } from '@/shared/router'

export const currentRoute = routes.account.administration

PageTitleFactory({
  title: 'Администрирование',
  // route: currentRoute,

  route: chainAdmin(currentRoute)
})
