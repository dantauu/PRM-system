import { currentRoute } from './model'
import { suspenseWrapper } from '@/pages/suspense-wrapper'
import { PageLayout } from '@/shared/components'
import { lazy } from 'react'
import { chainAdmin } from '@/shared/effector/administration/admin-status'

export const Page = suspenseWrapper(lazy(() => import('./ui')))

export const AdministrationRoute = {
  view: Page,
  route: chainAdmin(currentRoute),
  // route: currentRoute,
  layout: PageLayout,
}
