import { getAll } from './_get-all'
import { addColor } from '@/shared/api/strategy/global-strategy-status-color/_add-color'

export * from './types'

export const globalStrategyStatusColor = {
  getAll,
  addColor,
}
