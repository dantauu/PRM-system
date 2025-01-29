export interface Communication {
  custom_strategy_step_id: number
  custom_strategy_step_result_id: number
  contact_custom_strategy_status_id: number
  communication_type_id: number
  communications_id: number

  comment: string
  date: string

  contact_id: number
  custom_strategy_name?: string
  contact_first_name?: string
  contact_last_name?: string
  communication_type_name?: string
}

export interface CommunicationStatsItem {
  date: string
  count: number
}

export type CreateCommunication = Omit<
  Communication,
  'communications_id' | 'contact_custom_strategy_status_id'
> & {
  contact_id: number
}
