import { ContactWithInfo } from '@/shared/api'
import { Button } from '@/shared/components'
import { routes } from '@/shared/router'
import { FC, memo } from 'react'

interface EditContactButtonProps {
  className?: string

  contact: ContactWithInfo
}

export const EditContactButton: FC<EditContactButtonProps> = ({ className, contact }) => {
  return (
    <Button
      className={className}
      to={routes.account.contact.edit}
      params={{ contactId: contact.contact_id }}
    >
      Редактировать
    </Button>
  )
}

export const MemoEditContactButton = memo(EditContactButton)
