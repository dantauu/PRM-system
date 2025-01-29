import { create } from './_create'
import { getAll } from './_get-all'
import { getAllByContact } from './_get-all-by-contact'
import { getAllByContactIdFx } from './_get-all-by-contact-id'

export * from './types'
export type * from './_get-all-by-contact'

export const communication = {
  getAll,
  getAllByContact,
  create,
  getAllByContactIdFx
}
