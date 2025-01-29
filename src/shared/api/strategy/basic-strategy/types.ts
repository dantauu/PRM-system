export interface BasicStrategy {
  basic_strategy_id: number

  language_id: number
  shop_item_id: number

  name: string
  creation_date: string
  update_date: string
}

export type CreateBasicStrategy = Omit<
  BasicStrategy,
  'basic_strategy_id' | 'creation_date' | 'update_date'
>

export interface BasicStrategyStep {
  basic_strategy_id: number
  basic_strategy_step_id: number

  name: string
  description: string
  comment: string
}

export type CreateBasicStrategyStep = Omit<BasicStrategyStep, 'basic_strategy_step_id'>

export interface BasicStrategyStatus {
  basic_strategy_id: number
  basic_strategy_status_id: number
  basic_strategy_step_result_id: number

  global_strategy_status_color_id: number

  name: string
  description: string
  activity_flag: boolean
}

export type CreateBasicStrategyStatus = Omit<BasicStrategyStatus, 'basic_strategy_status_id'>

export interface BasicStrategyStepResult {
  basic_strategy_step_id: number
  basic_strategy_next_step_id: number
  basic_strategy_status_id: number

  result_name: string
  result_description: string
}

export type CreateBasicStrategyStepResult = Omit<
  BasicStrategyStepResult,
  'basic_strategy_step_result_id'
>
