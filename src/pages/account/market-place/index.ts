import { currentRoute } from './model'
import { suspenseWrapper } from '@/pages/suspense-wrapper'
import { PageLayout } from '@/shared/components'
import { lazy } from 'react'

export const Page = suspenseWrapper(lazy(() => import('./ui')))

export const MarketplaceRoute = {
  view: Page,
  route: currentRoute,
  layout: PageLayout,
}
