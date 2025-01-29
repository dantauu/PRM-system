import { currentRoute } from './model'
import { SkeletonMainPage } from './skeleton'
import { suspenseWrapper } from '@/pages/suspense-wrapper'
import { PageLayout } from '@/shared/components'
import { lazy } from 'react'

export const Page = suspenseWrapper(
  lazy(() => import('./ui')),
  <SkeletonMainPage />
)

export const MainRoute = {
  view: Page,
  route: currentRoute,
  layout: PageLayout,
}
