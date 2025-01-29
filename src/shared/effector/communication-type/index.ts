import { $$app } from '../app'
import { communicationType } from '@/shared/api'
import { GetAllFactory } from '@/shared/factories'
import { sample } from 'effector'

//* Get All
const getAll = GetAllFactory({
  name: 'COMMUNICATION_TYPE',
  api: communicationType.getAll,
})

sample({
  clock: $$app.started,
  target: getAll.submited,
})

export const $$communicationType = { getAll }
