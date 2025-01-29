import { account } from './account'
import { auth } from './auth'
import { LandingRoute } from './landing-page'
import { LandingRefRoute } from './landing-ref-page'
import { createRoutesView } from 'atomic-router-react'

export const Pages = createRoutesView({
  routes: [LandingRoute, LandingRefRoute, ...auth, ...account],
})
