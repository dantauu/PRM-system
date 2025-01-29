import { create } from './_create'
import { deleteContact } from './_delete'
import { getAll } from './_get-all'
import { getCount } from './_get-count'
import { getItem } from './_get-item'
import { getLast } from './_get-last'
import { getReports } from './_get-reports'
import { update } from './_update'
import { updateAvatar } from './_update-avatar'

export const contact = {
  getCount,
  get: getAll,
  getLast,
  getItem,
  update,
  create,
  deleteContact,
  updateAvatar,
  getReports,
}

export * from './types'
