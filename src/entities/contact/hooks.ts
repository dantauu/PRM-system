import { $$customStrategies } from '@/shared/effector'
import { $$contactCustomStrategyStatuses } from '@/shared/effector/contact'
import { useStoreMap, useUnit } from 'effector-react'

export const useContactStatus = (contactId: number) => {
  // Effector
  const statuses = useUnit([$$customStrategies.$status, $$contactCustomStrategyStatuses.$status])

  const status = useStoreMap({
    store: $$contactCustomStrategyStatuses.$mapStatusToContactId,
    keys: [contactId],
    fn: (items) => {
      return (contactId in items ? items[contactId] : null)
    },
  })

  // Variables
  const pending = statuses.some((status) => status === 'pending')

  return {
    status,
    pending,
  }
}
