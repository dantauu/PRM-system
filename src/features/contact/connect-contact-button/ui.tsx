import { ContactWithInfo } from '@/shared/api'
import { Button } from '@/shared/components'
import { openModalContact } from '@/shared/effector/contact/modal-contact'
import { FC, memo } from 'react'

interface ConnectContactButtonProps {
  className?: string

  contact: ContactWithInfo
}

export const ConnectContactButton: FC<ConnectContactButtonProps> = ({ className, contact }) => {
  return (
    <Button
      className={className}
      onClick={openModalContact}
    >
      Связаться
    </Button>
  )
}

export const MemoConnectContactButton = memo(ConnectContactButton)
