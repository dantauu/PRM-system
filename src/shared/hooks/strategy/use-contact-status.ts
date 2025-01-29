import { ContactWithInfo, CustomStrategyStatus } from '@/shared/api'
import { DCustomStrategy } from '@/shared/domain'
import { useMemo } from 'react'

interface UseContactStatusParams {
  strategy: DCustomStrategy | null
  contact: ContactWithInfo | null
}

type UseContactStatus = [CustomStrategyStatus, boolean]

export const useContactStatus = ({
  strategy,
  contact,
}: UseContactStatusParams): UseContactStatus => {
  // Variables
  const pending = !contact || !strategy

  // Memo
  const status = useMemo(
    () =>
      strategy?.contacts.find(({ contact_id }) => contact_id === contact.contact_id).status || null,
    [contact.contact_id, strategy?.contacts]
  )

  return [status, pending]
}
