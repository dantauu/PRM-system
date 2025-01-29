import { request } from './request'
import { createEffect } from 'effector'

export interface TeamItem {
  userId: number
  login: string
  name: string
  surname: string
  city: string
  country: string
  phone: string
  telegram: string
  activeDate: string
  firstLine: number
  trade: number
  struct: string
}

interface GetResponse {
  team: TeamItem[]
}

const get = createEffect(() => request<never, GetResponse>('team/', { method: 'GET' }))

interface ReportsResponse {
  date: string
  count: number
}

export const getReports = createEffect(
  ({
    custom_strategy_id,
    startDate,
    endDate,
  }: {
    custom_strategy_id: number
    startDate: string
    endDate: string
  }) =>
    request<never, ReportsResponse[]>(
      `reports/referrals?custom_strategy_id=${custom_strategy_id}&start_date=${startDate}&end_date=${endDate}`,
      { method: 'GET' }
    )
)

export const team = {
  get,
  getReports,
}
