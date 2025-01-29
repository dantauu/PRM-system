import { customStrategy } from '@/shared/api'
import { $$activeStrategy, $$alerts, $$customStrategies } from '@/shared/effector'
import { RequestFactory } from '@/shared/factories'
import { createEvent, sample } from 'effector'

const reset = RequestFactory({
  name: 'RESET_CUSTOM_STRATEGY',
  api: customStrategy.reset,
})

const submited = createEvent()

sample({
  clock: submited,
  source: $$activeStrategy.$strategy,
  target: reset.submited,
})

sample({
  clock: reset.done,
  fn: () => 'Стратегия успешно сброшена',
  target: $$alerts.showSuccess,
})

sample({
  clock: reset.done,
  source: $$activeStrategy.$strategy,
  fn: (strategy) => strategy.custom_strategy_id,
  target: [$$activeStrategy.requestes.strategy.submited, $$customStrategies.submited],
})

export const $$resetStrategyButton = {
  ...reset,
  submited,
}
