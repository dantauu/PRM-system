import { request } from '../request'
import { createEffect } from 'effector'

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
      `reports/communications?custom_strategy_id=${custom_strategy_id}&start_date=${startDate}&end_date=${endDate}`,
      { method: 'GET' }
    )
)
