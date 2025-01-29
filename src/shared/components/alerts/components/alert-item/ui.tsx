import { Alert } from '@/shared/effector'
import { FC, memo, useCallback } from 'react'
import { Alert as BootstrapAlert } from 'react-bootstrap'

interface AlertItemProps extends Alert {
  onClose: (id: number) => void
}

export const AlertItem: FC<AlertItemProps> = ({ id, message, variant, onClose }) => {
  // Handlers
  const handleClose = useCallback(() => onClose(id), [id, onClose])

  return (
    <BootstrapAlert
      variant={variant}
      onClose={handleClose}
      dismissible
      style={{
        position:'relative',
        zIndex: 1050
      }}
    >
      {message}
    </BootstrapAlert>
  )
}

export const MemoAlertItem = memo(AlertItem)
