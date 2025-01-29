import { suspenseWrapper } from '../suspense-wrapper'
import { currentRoute } from './model'
import { lazy } from 'react'

export const LazyLanding = suspenseWrapper(lazy(() => import('./ui')))

export const LandingRoute = {
  view: LazyLanding,
  route: currentRoute,
}
