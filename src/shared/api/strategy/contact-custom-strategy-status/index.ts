import { getAll } from './_get-all'
import { getAllOfStrategies } from './_get-all-of-strategies'
import { getByContact } from './_get-by-contact'

export * from './types'

export const contactCustomStrategyStatus = {
  getAll,
  getAllOfStrategies,
  getByContact,
}
