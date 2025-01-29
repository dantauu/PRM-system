import { createEffect } from 'effector'

export interface Strategy {
  id: number
  name: string
}

export interface Status {
  id: number
  position: number
  name: string
  color: string
  script: string
  value: number
}

const get = createEffect(
  () =>
    [
      {
        id: 1,
        name: 'PRM',
      },
      {
        id: 2,
        name: 'PRM 2',
      },
    ] as Strategy[]
)

export const strategy = {
  get,
}

export * from './basic-strategy'
export * from './custom-strategy'
export * from './global-strategy-status-color'
export * from './contact-custom-strategy-status'
export * from './communication-type'
export * from './communication'
