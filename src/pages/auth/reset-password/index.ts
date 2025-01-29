import { currentRoute } from './model'
import { suspenseWrapper } from '@/pages/suspense-wrapper'
import { AuthLayout } from '@/shared/components'
import { lazy } from 'react'

export const Page = suspenseWrapper(lazy(() => import('./ui')))

export const ResetPasswordRoute = {
  view: Page,
  route: currentRoute,
  layout: AuthLayout,
}
