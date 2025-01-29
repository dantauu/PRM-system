import { FAQItem } from '../../types'
import './style.scss'
import classNames from 'classnames'
import { FC, useCallback } from 'react'

interface AccordionItemProps {
  item: FAQItem

  isOpen: boolean
  onOpen: (id: number) => void
  onClose: () => void
}

export const AccordionItem: FC<AccordionItemProps> = ({ item, isOpen, onOpen, onClose }) => {
  // Variables
  const { id, title, content } = item
  const ClassName = classNames('faq-accordion-item', {
    'faq-accordion-item--open': isOpen,
  })

  // Handlers
  const handleClick = useCallback(() => {
    if (isOpen) {
      onClose()
      return
    }

    onOpen(id)
  }, [id, isOpen, onOpen, onClose])

  return (
    <div className={ClassName}>
      <div
        className="faq-accordion-item__header"
        onClick={handleClick}
      >
        <div className="faq-accordion-item__title">{title}</div>
        <div className="faq-accordion-item__chevron" />
      </div>
      <div className="faq-accordion-item__content">{content}</div>
    </div>
  )
}
