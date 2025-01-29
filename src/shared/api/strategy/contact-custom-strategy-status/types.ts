import { Contact } from '../../contact'
import { CustomStrategyStatus } from '../custom-strategy'

export interface ContactCustomStrategyStatus {
  contact_id: Contact
  custom_strategy_status_id: CustomStrategyStatus
  update_date: '2024-03-02T01:05:39.869Z'
}

export type CreateContactCustomStrategyStatus = Omit<
  ContactCustomStrategyStatus,
  'contact_custom_strategy_status_id' | 'update_date'
>
