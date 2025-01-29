import { $$session } from '@/shared/effector'
import { routes } from '@/shared/router'
import { sample } from 'effector'

export const currentRoute = routes.landing

sample({
  clock: currentRoute.opened,
  fn: (same) => same.query['ref'] || 'PRM4ALL',
  target: $$session.refLoginChanged,
})
