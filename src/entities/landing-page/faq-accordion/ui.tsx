import { AccordionItem } from './components/accordion-item'
import { FAQItem } from './types'
import classNames from 'classnames'
import { FC, useCallback, useState } from 'react'

interface FAQAccordionProps {
  className?: string
  items: FAQItem[]
}

export const FAQAccordion: FC<FAQAccordionProps> = ({ className, items }) => {
  // State
  const [opened, setOpened] = useState<number | null>(null)

  // Variables
  const ClassName = classNames('faq-accordion', className)

  // Handlers
  const handleOpen = useCallback((id: number) => setOpened(id), [])
  const handleClose = useCallback(() => setOpened(null), [])

  return (
    <div className={ClassName}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={opened === item.id}
          onOpen={handleOpen}
          onClose={handleClose}
        />
      ))}
    </div>
  )
}
