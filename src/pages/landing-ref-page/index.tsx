import { suspenseWrapper } from '../suspense-wrapper'
import { currentRoute } from './model'
import { lazy } from 'react'

export const LazyLandingRef = suspenseWrapper(lazy(() => import('./ui')))

export const LandingRefRoute = {
  view: LazyLandingRef,
  route: currentRoute,
}
