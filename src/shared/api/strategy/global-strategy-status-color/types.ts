export interface GlobalStrategyStatusColor {
  global_strategy_status_color_id: 0
  color_HEX: 'string'
}

export type CreateGlobalStrategyStatusColor = Omit<
  GlobalStrategyStatusColor,
  'global_strategy_status_color_id'
>
