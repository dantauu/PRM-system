import { get } from './_get'
import { getLogin } from './_get-login'
import { update } from './_update'
import { updateAvatar } from './_update-avatar'

export const profile = {
  get,
  getLogin,

  update,
  updateAvatar,
}

export * from './types'
