import './style.scss'
import { Button } from '@/shared/components/buttons'
import { $$alerts, $$session } from '@/shared/effector'
import { useCopy } from '@/shared/hooks'
import classNames from 'classnames'
import { useUnit } from 'effector-react'
import { FC, memo, useCallback } from 'react'

interface CopyInviteLinkButtonProps {
  className?: string
}

export const CopyInviteLinkButton: FC<CopyInviteLinkButtonProps> = ({ className }) => {
  // Effector
  const login = useUnit($$session.$login)
  const showAlert = useUnit($$alerts.showSuccess)

  // Hooks
  const { onCopy } = useCopy(location.origin + '/?ref=' + login)

  // Variables
  const ClassName = classNames('copy-invite-link-button', className)

  // Handlers
  const handleCopy = useCallback(() => {
    onCopy()
    showAlert('Скопировано')
  }, [onCopy, showAlert])

  return (
    <Button
      className={ClassName}
      onClick={handleCopy}
    >
      Ссылка для приглашения
    </Button>
  )
}

export const MemoCopyInviteLinkButton = memo(CopyInviteLinkButton)
