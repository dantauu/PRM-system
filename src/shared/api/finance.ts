import { request } from './request'
import { createEffect } from 'effector'

export interface FinanceHistoryItem {
  id: number
  sum: number
  type: string
  login: string
  date: string
}

// Balance

interface BalanceResponse {
  balance: number
}

const getBalance = createEffect(() =>
  request<never, BalanceResponse>('finances/balance', { method: 'GET' })
)

// History

interface HistoryResponse {
  history: FinanceHistoryItem[]
}

const getHistory = createEffect(() =>
  request<never, HistoryResponse>('finances/history', { method: 'GET' })
)

const postCalculateIncomes = createEffect(
  ({ custom_strategy_id }: { custom_strategy_id: number }) =>
    request<unknown, { values: number[] }>('finances/calculate-incomes', {
      method: 'POST',
      data: { custom_strategy_id: custom_strategy_id },
    })
)

interface ReportsResponse {
  date: string
  sum: number
}

const getReports = createEffect(
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
      `reports/incomes?custom_strategy_id=${custom_strategy_id}&start_date=${startDate}&end_date=${endDate}`,
      { method: 'GET' }
    )
)

// withdraw

const withdraw = createEffect(({total} : {total: number}) =>
  request<unknown, {status: string}>('finances/withdraw', {
    method: 'POST',
    data: { total: total },
  }))


export const finance = {
  getBalance,
  getHistory,
  postCalculateIncomes,
  getReports,
  withdraw
}
