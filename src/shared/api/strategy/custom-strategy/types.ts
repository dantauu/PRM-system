export interface CustomStrategy {
  basic_strategy_id: number
  custom_strategy_id: number

  language_id: number
  shop_item_id: number

  name: string
  description: string
  image: string
  creation_date: string
  update_date: string
}

export type UpdateCustomStrategy = Omit<
  CustomStrategy,
  'basic_strategy_id' | 'shop_item_id' | 'creation_date' | 'update_date'
>

export type ResetCustomStrategy = { custom_strategy_id: number }

export interface CustomStrategyStep {
  custom_strategy_id: number
  custom_strategy_step_id: number

  name: string
  description: string
  comment: string
}

export type CreateCustomStrategyStep = Omit<CustomStrategyStep, 'custom_strategy_step_id'>
export type UpdateCustomStrategyStep = Omit<CustomStrategyStep, 'custom_strategy_id'>

export interface CustomStrategyStatus {
  custom_strategy_id: number
  custom_strategy_status_id: number
  custom_strategy_next_step_id: number
  custom_strategy_head_status_id: number

  global_strategy_status_color_id: number

  name: string
  description: string
  activity_flag: boolean
}

export type CreateCustomStrategyStatus = Omit<CustomStrategyStatus, 'custom_strategy_status_id'>
export type UpdateCustomStrategyStatus = Omit<CustomStrategyStatus, 'custom_strategy_id'>

export interface CustomStrategyStepResult {
  custom_strategy_step_id: number
  custom_strategy_status_id: number
  custom_strategy_step_result_id: number

  result_name: string
  result_description: string
}

export type CreateCustomStrategyStepResult = Omit<
  CustomStrategyStepResult,
  'custom_strategy_step_result_id'
>

export type UpdateCustomStrategyStepResult = CustomStrategyStepResult
