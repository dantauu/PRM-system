import { $$landingRefPage, $$session } from '@/shared/effector'
import { routes } from '@/shared/router'
import { sample } from 'effector'

export const currentRoute = routes.landingRef

sample({
  clock: currentRoute.opened,
  fn: ({ params }) => params.login,
  target: [$$landingRefPage.submited, $$session.refLoginChanged],
})

sample({
  clock: currentRoute.closed,
  target: $$landingRefPage.reseted,
})
