import { currentRoute } from './model'
import { SkeletonFinancePage } from './skeleton'
import { suspenseWrapper } from '@/pages/suspense-wrapper'
import { PageLayout } from '@/shared/components'
import { lazy } from 'react'

export const Page = suspenseWrapper(
  lazy(() => import('./ui')),
  <SkeletonFinancePage />
)

export const FinanceRoute = {
  view: Page,
  route: currentRoute,
  layout: PageLayout,
}
