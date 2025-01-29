import { basicStrategy } from '@/shared/api'
import { GetAllFactory } from '@/shared/factories'

//* ---------- Get All ----------
const getAll = GetAllFactory({ name: 'BASIC_STRATEGY', api: basicStrategy.getAll })

export const $$basicStrategy = {
  getAll,
}
