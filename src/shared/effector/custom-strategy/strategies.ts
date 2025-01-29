import { customStrategy } from '@/shared/api'
import { $$session } from '@/shared/effector'
import { GetAllFactory } from '@/shared/factories'
import { sample } from 'effector'

const getAll = GetAllFactory({
  name: 'CUSTOM_STRATEGY',
  api: customStrategy.getAll,
})

sample({
  clock: $$session.authed,
  target: getAll.submited,
})

export const $$customStrategies = getAll
