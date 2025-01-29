import { CustomStrategyStepResult } from '..'
import { request } from '@/shared/api/request'
import { createEffect } from 'effector'

export const getStepResultsFx = createEffect((step_id: number) =>
  request<never, CustomStrategyStepResult[]>(`custom_strategy_steps/${step_id}/results`, {}))
