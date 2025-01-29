import { AlertItem } from './components/alert-item'
import './style.scss'
import { $$alerts } from '@/shared/effector'
import { useUnit } from 'effector-react'
import ReactDOM from 'react-dom'

const modalsNode = document.getElementById('modals')

export const Alerts = () => {
  // Effector
  const items = useUnit($$alerts.$items)
  const hidden = useUnit($$alerts.hidden)

  if (!modalsNode) {
    return null
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div className="alerts">
          {items.map(({ id, message, variant }) => (
            <div
              key={id}
              className="alerts__item"
            >
              <AlertItem
                id={id}
                message={message}
                variant={variant}
                onClose={hidden}
              />
            </div>
          ))}
        </div>,
        modalsNode
      )}
    </>
  )
}
